import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLoginMutation } from "@/state/api";
import { useAppDispatch } from "@/state/redux";
import { saveUser } from "@/state";

const getMe = async (token: string) => {
  const response = await fetch(
    import.meta.env.VITE_API_BASE_URL + "/user/me/",
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setError("");
      const data = await login({ user: { email, password } });

      if (!data.data) {
        setError("Email or password is incorrect");
        return;
      }
      Cookies.set("token", data.data.token);
      const me = await getMe(data.data.token);
      dispatch(saveUser(me));
      localStorage.setItem("user", JSON.stringify(me));

      const userRole = me.roles[0].name;

      if (userRole === "admin") {
        navigate("/admin");
      }
      if (userRole === "partner") {
        navigate("/");
      }
      if (userRole === "candidate") {
        navigate("/psikotest");
      }
    } catch (error) {
      setError("Failed to log in");
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl mb-2">Welcome back</CardTitle>
          <CardDescription>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {error}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
