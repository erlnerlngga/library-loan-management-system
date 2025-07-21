/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { Partner } from "@/types/patner/patner";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = Cookies.get("token");
      console.log({ token });
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["users"],
  endpoints: (build) => ({
    login: build.mutation<
      { token: string },
      { user: { email: string; password: string } }
    >({
      queryFn: async ({ user }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/user/token/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: user,
          });

          return {
            data: result.data as { token: string },
          };
        } catch (error: any) {
          return { error: error || "Could not fetch campaign data" };
        }
      },
    }),
    register: build.mutation<
      { id: string; email: string; roles: { id: string; name: string }[] },
      { user: { email: string; password: string; roles: { name: string }[] } }
    >({
      queryFn: async ({ user }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/user/create/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: user,
          });

          return {
            data: result.data as {
              id: string;
              email: string;
              roles: { id: string; name: string }[];
            },
          };
        } catch (error: any) {
          return { error: error || "Could not fetch campaign data" };
        }
      },
    }),
    createPartner: build.mutation<
      Partner,
      {
        partner: {
          name: string;
          company: string;
          phone: string;
          color_brand: string;
          paid_until: string;
          on_trial: boolean;
          is_active: boolean;
          user: { email: string; password: string; roles: { name: string }[] };
        };
      }
    >({
      queryFn: async ({ partner }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/partner/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: partner,
          });

          return {
            data: result.data as Partner,
          };
        } catch (error: any) {
          return { error: error || "Could not fetch campaign data" };
        }
      },
    }),
    editPartner: build.mutation<
      Partner,
      {
        id: string;
        patner: {
          name: string;
          company: string;
          phone: string;
          color_brand: string;
          paid_until: string;
          on_trial: boolean;
          is_active: boolean;
        };
      }
    >({
      queryFn: async (
        { id, patner },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/partner/${id}/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "PATCH",
            body: patner,
          });

          return {
            data: result.data as Partner,
          };
        } catch (error: any) {
          return { error: error || "Could not fetch campaign data" };
        }
      },
    }),
    getMe: build.query<
      {
        id: string;
        email: string;
        password: string;
        roles: { id: string; name: string }[];
      },
      void
    >({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/user/me/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return {
            data: partnerRes.data as {
              id: string;
              email: string;
              password: string;
              roles: { id: string; name: string }[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch me data" };
        }
      },
    }),
    getPartnerById: build.query<
      Partner,
      {
        id: string;
      }
    >({
      queryFn: async ({ id }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/partner/${id}/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return { data: partnerRes.data as Partner };
        } catch (error: any) {
          return { error: error.message || "Could not fetch hazard  data" };
        }
      },
    }),
    getPartner: build.query<
      {
        count: number;
        next: number | null;
        previous: number | null;
        results: Partner[];
      },
      void
    >({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/partner/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ partnerRes });

          return {
            data: partnerRes.data as {
              count: number;
              next: number | null;
              previous: number | null;
              results: Partner[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch partner  data" };
        }
      },
    }),
    createLevel: build.mutation<
      {
        id: string;
        name: string;
        partner: string;
        psychotests: { id: string; name: string; slug: string }[];
      },
      {
        level: {
          name: string;
          partner: string;
          psychotests: { name: string; slug: string }[];
        };
      }
    >({
      queryFn: async ({ level }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/level/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: level,
          });

          return {
            data: result.data as {
              id: string;
              name: string;
              partner: string;
              psychotests: { id: string; name: string; slug: string }[];
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create level data" };
        }
      },
    }),
    getLevel: build.query<
      {
        count: number;
        next: string | null;
        previous: string | null;
        results: {
          id: string;
          name: string;
          partner: string;
          psychotests: { id: string; name: string; slug: string }[];
        }[];
      },
      void
    >({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/level/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return {
            data: partnerRes.data as {
              count: number;
              next: string | null;
              previous: string | null;
              results: {
                id: string;
                name: string;
                partner: string;
                psychotests: { id: string; name: string; slug: string }[];
              }[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch partner  data" };
        }
      },
    }),
    getPsychotest: build.query<
      {
        count: number;
        next: number | null;
        previous: number | null;
        results: { id: string; name: string; slug: string }[];
      },
      void
    >({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/psychotest/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ partnerRes });

          return {
            data: partnerRes.data as {
              count: number;
              next: number | null;
              previous: number | null;
              results: { id: string; name: string; slug: string }[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch partner  data" };
        }
      },
    }),
    getPsychotestHistory: build.query<
      {
        id: string;
        start_test: string;
        finish_test: string;
        duration: string;
        psychotest_name: string;
        candidate: string;
        project: string;
      }[],
      { candidate_id: string; project_id: string }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/psychotest/history?candidate_id=${candidate_id}&project_id=${project_id}/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return {
            data: partnerRes.data as {
              id: string;
              start_test: string;
              finish_test: string;
              duration: string;
              psychotest_name: string;
              candidate: string;
              project: string;
            }[],
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch partner  data" };
        }
      },
    }),
    getPsychotestObservation: build.query<
      {
        id: string;
        browser: string;
        os: string;
        platform: string;
        psychotest_name: string;
        candidate: string;
        project: string;
        photos: { id: string; photo: string; observation: string }[];
      }[],
      { candidate_id: string; project_id: string }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/psychotest/history?candidate_id=${candidate_id}&project_id=${project_id}/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return {
            data: partnerRes.data as {
              id: string;
              browser: string;
              os: string;
              platform: string;
              psychotest_name: string;
              candidate: string;
              project: string;
              photos: { id: string; photo: string; observation: string }[];
            }[],
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch partner  data" };
        }
      },
    }),
    getProject: build.query<
      {
        count: number;
        next: string | null;
        previous: string | null;
        results: {
          id: string;
          project_name: string;
          description: string;
          number_of_candidates: number;
          candidates_completed: number;
          start_date: string;
          end_date: string;
          status_project: string;
          level: {
            id: string;
            name: string;
            partner: string;
            psychotests: { id: string; name: string; slug: string }[];
          };
        }[];
      },
      { currentPage: number }
    >({
      queryFn: async (
        { currentPage },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/project/?page=${currentPage}`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return {
            data: partnerRes.data as {
              count: number;
              next: string | null;
              previous: string | null;
              results: {
                id: string;
                project_name: string;
                description: string;
                number_of_candidates: number;
                candidates_completed: number;
                start_date: string;
                end_date: string;
                status_project: string;
                level: {
                  id: string;
                  name: string;
                  partner: string;
                  psychotests: { id: string; name: string; slug: string }[];
                };
              }[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch project data" };
        }
      },
    }),
    getProjectById: build.query<
      {
        id: string;
        partner: string;
        project_name: string;
        description: string;
        number_of_candidates: number;
        candidates_completed: number;
        start_date: string;
        end_date: string;
        status_project: string;
        level: {
          id: string;
          name: string;
          partner: string;
          psychotests: { id: string; name: string; slug: string }[];
        };
      },
      {
        id: string;
      }
    >({
      queryFn: async ({ id }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/project/${id}/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return {
            data: partnerRes.data as {
              id: string;
              partner: string;
              project_name: string;
              description: string;
              number_of_candidates: number;
              candidates_completed: number;
              start_date: string;
              end_date: string;
              status_project: string;
              level: {
                id: string;
                name: string;
                partner: string;
                psychotests: { id: string; name: string; slug: string }[];
              };
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch hazard  data" };
        }
      },
    }),
    createProject: build.mutation<
      {
        id: string;
        partner: string;
        project_name: string;
        description: string;
        number_of_candidates: number;
        candidates_completed: number;
        start_date: string;
        end_date: string;
        status_project: string;
        level: string;
      },
      {
        project: {
          partner: string;
          project_name: string;
          description: string;
          number_of_candidates: number;
          candidates_completed: number;
          start_date: string;
          end_date: string;
          status_project: string;
          level: string;
        };
      }
    >({
      queryFn: async ({ project }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/project/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: project,
          });

          return {
            data: result.data as {
              id: string;
              partner: string;
              project_name: string;
              description: string;
              number_of_candidates: number;
              candidates_completed: number;
              start_date: string;
              end_date: string;
              status_project: string;
              level: string;
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create project data" };
        }
      },
    }),
    editProject: build.mutation<
      {
        id: string;
        partner: string;
        project_name: string;
        description: string;
        number_of_candidates: number;
        candidates_completed: number;
        start_date: string;
        end_date: string;
        status_project: string;
        level: string;
      },
      {
        id: string;
        project: {
          partner: string;
          project_name: string;
          description: string;
          number_of_candidates: number;
          candidates_completed: number;
          start_date: string;
          end_date: string;
          status_project: string;
          level: string;
        };
      }
    >({
      queryFn: async (
        { id, project },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/project/${id}/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "PUT",
            body: project,
          });

          return {
            data: result.data as {
              id: string;
              partner: string;
              project_name: string;
              description: string;
              number_of_candidates: number;
              candidates_completed: number;
              start_date: string;
              end_date: string;
              status_project: string;
              level: string;
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create project data" };
        }
      },
    }),
    getCandidate: build.query<
      {
        count: number;
        next: string | null;
        previous: string | null;
        results: {
          id: string;
          name: string;
          company: string;
          phone: string;
          photo: string;
          cv: string;
          birth_of_place: string;
          birth_of_date: string;
          gender: string;
          marital_status: string;
          current_job: string;
          position: string;
          education: string;
          major: string;
          address: string;
          have_done: boolean;
          project: {
            id: string;
            partner: string;
            project_name: string;
            description: string;
            number_of_candidates: number;
            candidates_completed: number;
            start_date: string;
            end_date: string;
            status_project: string;
            level: {
              id: string;
              name: string;
              partner: string;
              psychotests: { id: string; name: string; slug: string }[];
            };
          }[];
          user: { email: string; password: string; roles: { name: string }[] };
        }[];
      },
      {
        currentPage: number;
        project_id?: string;
        user_id?: string;
        partner_id?: string;
      }
    >({
      queryFn: async (
        { currentPage, project_id, user_id, partner_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          let endpoint = `/candidate/?page=${currentPage}`;

          if (project_id) {
            endpoint = `/candidate/?page=${currentPage}&project_id=${project_id}`;
          }

          if (partner_id) {
            endpoint = `/candidate/?page=${currentPage}&partner_id=${partner_id}`;
          }

          if (user_id) {
            endpoint = `/candidate/?user_id=${user_id}`;
          }

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ partnerRes });
          // console.log({ endpoint });

          return {
            data: partnerRes.data as {
              count: number;
              next: string | null;
              previous: string | null;
              results: {
                id: string;
                name: string;
                company: string;
                phone: string;
                photo: string;
                cv: string;
                birth_of_place: string;
                birth_of_date: string;
                gender: string;
                marital_status: string;
                current_job: string;
                position: string;
                education: string;
                major: string;
                address: string;
                have_done: boolean;
                project: {
                  id: string;
                  partner: string;
                  project_name: string;
                  description: string;
                  number_of_candidates: number;
                  candidates_completed: number;
                  start_date: string;
                  end_date: string;
                  status_project: string;
                  level: {
                    id: string;
                    name: string;
                    partner: string;
                    psychotests: { id: string; name: string; slug: string }[];
                  };
                }[];
                user: {
                  email: string;
                  password: string;
                  roles: { name: string }[];
                };
              }[];
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch project data" };
        }
      },
    }),
    getCandidateById: build.query<
      {
        id: string;
        name: string;
        company: string;
        phone: string;
        photo: string;
        cv: string;
        birth_of_place: string;
        birth_of_date: string;
        gender: string;
        marital_status: string;
        current_job: string;
        position: string;
        education: string;
        major: string;
        address: string;
        have_done: boolean;
        project: {
          id: string;
          partner: string;
          project_name: string;
          description: string;
          number_of_candidates: number;
          candidates_completed: number;
          start_date: string;
          end_date: string;
          status_project: string;
          level: {
            id: string;
            name: string;
            partner: string;
            psychotests: { id: string; name: string; slug: string }[];
          };
        }[];
        user: { id: string; email: string; roles: { name: string }[] };
      },
      { id: string }
    >({
      queryFn: async ({ id }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/candidate/${id}/`;

          const partnerRes = await fetchWithBQ(endpoint);
          // console.log({ userDetailsResponse });

          return {
            data: partnerRes.data as {
              id: string;
              name: string;
              company: string;
              phone: string;
              photo: string;
              cv: string;
              birth_of_place: string;
              birth_of_date: string;
              gender: string;
              marital_status: string;
              current_job: string;
              position: string;
              education: string;
              major: string;
              address: string;
              have_done: boolean;
              project: {
                id: string;
                partner: string;
                project_name: string;
                description: string;
                number_of_candidates: number;
                candidates_completed: number;
                start_date: string;
                end_date: string;
                status_project: string;
                level: {
                  id: string;
                  name: string;
                  partner: string;
                  psychotests: { id: string; name: string; slug: string }[];
                };
              }[];
              user: {
                id: string;
                email: string;
                roles: { name: string }[];
              };
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch project data" };
        }
      },
    }),
    createCandidate: build.mutation<
      {
        id: string;
        name: string;
        company: string;
        phone: string;
        birth_of_place: string;
        birth_of_date: string;
        gender: string;
        marital_status: string;
        current_job: string;
        position: string;
        education: string;
        major: string;
        address: string;
        have_done: boolean;
        project: {
          id: string;
          partner: string;
          project_name: string;
          description: string;
          number_of_candidates: number;
          candidates_completed: number;
          start_date: string;
          end_date: string;
          status_project: string;
          level: {
            id: string;
            name: string;
            partner: string;
            psychotests: { id: string; name: string; slug: string }[];
          };
        }[];
        user: {
          email: string;
          password: string;
          roles: { name: string }[];
        };
      },
      {
        candidate: {
          name: string;
          project: {
            partner: string;
            project_name: string;
            description: string;
            number_of_candidates: number;
            candidates_completed: number;
            start_date: string;
            end_date: string;
            status_project: string;
            level: string;
          }[];
          user: { email: string; password: string; roles: { name: string }[] };
        };
      }
    >({
      queryFn: async ({ candidate }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/candidate/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: candidate,
          });

          return {
            data: result.data as {
              id: string;
              name: string;
              company: string;
              phone: string;
              birth_of_place: string;
              birth_of_date: string;
              gender: string;
              marital_status: string;
              current_job: string;
              position: string;
              education: string;
              major: string;
              address: string;
              have_done: boolean;
              project: {
                id: string;
                partner: string;
                project_name: string;
                description: string;
                number_of_candidates: number;
                candidates_completed: number;
                start_date: string;
                end_date: string;
                status_project: string;
                level: {
                  id: string;
                  name: string;
                  partner: string;
                  psychotests: { id: string; name: string; slug: string }[];
                };
              }[];
              user: {
                id: string;
                email: string;
                password: string;
                roles: { id: string; name: string }[];
              };
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create candidate data" };
        }
      },
    }),
    editCandidate: build.mutation<
      {
        id: string;
        name: string;
        company: string;
        phone: string;
        photo: string;
        cv: string;
        birth_of_place: string;
        birth_of_date: string;
        gender: string;
        marital_status: string;
        current_job: string;
        position: string;
        education: string;
        major: string;
        address: string;
        have_done: boolean;
        project: {
          id: string;
          partner: string;
          project_name: string;
          description: string;
          number_of_candidates: number;
          candidates_completed: number;
          start_date: string;
          end_date: string;
          status_project: string;
          level: {
            id: string;
            name: string;
            partner: string;
            psychotests: { id: string; name: string; slug: string }[];
          };
        }[];
        user: {
          id: string;
          email: string;
          password: string;
          roles: { id: string; name: string }[];
        };
      },
      {
        id: string;
        candidate: {
          name: string;
          company: string;
          phone: string;
          birth_of_place: string;
          birth_of_date: string;
          gender: string;
          marital_status: string;
          current_job: string;
          position: string;
          education: string;
          major: string;
          address: string;
          have_done: boolean;
        };
      }
    >({
      queryFn: async (
        { id, candidate },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/candidate/${id}/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "PATCH",
            body: candidate,
          });

          return {
            data: result.data as {
              id: string;
              name: string;
              company: string;
              phone: string;
              photo: string;
              cv: string;
              birth_of_place: string;
              birth_of_date: string;
              gender: string;
              marital_status: string;
              current_job: string;
              position: string;
              education: string;
              major: string;
              address: string;
              have_done: boolean;
              project: {
                id: string;
                partner: string;
                project_name: string;
                description: string;
                number_of_candidates: number;
                candidates_completed: number;
                start_date: string;
                end_date: string;
                status_project: string;
                level: {
                  id: string;
                  name: string;
                  partner: string;
                  psychotests: { id: string; name: string; slug: string }[];
                };
              }[];
              user: {
                id: string;
                email: string;
                password: string;
                roles: { id: string; name: string }[];
              };
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create candidate data" };
        }
      },
    }),
    createMbti: build.mutation<
      {
        id: string;
        result: string;
        score_extrovert: number;
        score_introvert: number;
        score_feeling: number;
        score_intuition: number;
        score_judging: number;
        score_perceiving: number;
        score_sensing: number;
        score_thinking: number;
        candidate: string;
        project: string;
      },
      {
        mbti: {
          result: string;
          score_extrovert: number;
          score_introvert: number;
          score_feeling: number;
          score_intuition: number;
          score_judging: number;
          score_perceiving: number;
          score_sensing: number;
          score_thinking: number;
          candidate: string;
          project: string;
        };
      }
    >({
      queryFn: async ({ mbti }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/tool-psychotest/mbti/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: mbti,
          });

          return {
            data: result.data as {
              id: string;
              result: string;
              score_extrovert: number;
              score_introvert: number;
              score_feeling: number;
              score_intuition: number;
              score_judging: number;
              score_perceiving: number;
              score_sensing: number;
              score_thinking: number;
              candidate: string;
              project: string;
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create mbti data" };
        }
      },
    }),
    getMbti: build.query<
      {
        id: string;
        result: string;
        score_extrovert: number;
        score_introvert: number;
        score_feeling: number;
        score_intuition: number;
        score_judging: number;
        score_perceiving: number;
        score_sensing: number;
        score_thinking: number;
        candidate: string;
        project: string;
      }[],
      {
        candidate_id: string;
        project_id: string;
      }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/mbti?candidate_id=${candidate_id}&project_id=${project_id}/`;

          const result = await fetchWithBQ(endpoint);

          return {
            data: result.data as {
              id: string;
              result: string;
              score_extrovert: number;
              score_introvert: number;
              score_feeling: number;
              score_intuition: number;
              score_judging: number;
              score_perceiving: number;
              score_sensing: number;
              score_thinking: number;
              candidate: string;
              project: string;
            }[],
          };
        } catch (error: any) {
          return { error: error || "Could not create mbti data" };
        }
      },
    }),
    createPapiKostik: build.mutation<
      {
        id: string;
        candidate: string;
        project: string;
        papi_kostik_score: {
          id: string;
          factor: string;
          score: number;
          message: string;
          category: string;
          papi_kostik: string;
        }[];
      },
      {
        papi_kostik: {
          candidate: string;
          project: string;
          papi_kostik_score: {
            factor: string;
            score: number;
            message: string;
            category: string;
          }[];
        };
      }
    >({
      queryFn: async (
        { papi_kostik },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/papi-kostik/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: papi_kostik,
          });

          return {
            data: result.data as {
              id: string;
              candidate: string;
              project: string;
              papi_kostik_score: {
                id: string;
                factor: string;
                score: number;
                message: string;
                category: string;
                papi_kostik: string;
              }[];
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create papi kostik data" };
        }
      },
    }),
    getPapiKostik: build.query<
      {
        id: string;
        candidate: string;
        project: string;
        papi_kostik_score: {
          id: string;
          factor: string;
          score: number;
          message: string;
          category: string;
          papi_kostik: string;
        }[];
      }[],
      {
        candidate_id: string;
        project_id: string;
      }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/papi-kostik?project_id=${project_id}&candidate_id=${candidate_id}/`;

          const result = await fetchWithBQ(endpoint);

          return {
            data: result.data as {
              id: string;
              candidate: string;
              project: string;
              papi_kostik_score: {
                id: string;
                factor: string;
                score: number;
                message: string;
                category: string;
                papi_kostik: string;
              }[];
            }[],
          };
        } catch (error: any) {
          return { error: error || "Could not get papi kostik data" };
        }
      },
    }),
    createMsdt: build.mutation<
      {
        id: string;
        label: string;
        description: string;
        candidate: string;
        project: string;
      },
      {
        msdt: {
          label: string;
          description: string;
          candidate: string;
          project: string;
        };
      }
    >({
      queryFn: async ({ msdt }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/tool-psychotest/msdt/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: msdt,
          });

          return {
            data: result.data as {
              id: string;
              label: string;
              description: string;
              candidate: string;
              project: string;
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create msdt data" };
        }
      },
    }),
    getMsdt: build.query<
      {
        id: string;
        label: string;
        description: string;
        candidate: string;
        project: string;
      }[],
      {
        candidate_id: string;
        project_id: string;
      }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/msdt?project_id=${project_id}&candidate_id=${candidate_id}/`;

          const result = await fetchWithBQ(endpoint);

          return {
            data: result.data as {
              id: string;
              label: string;
              description: string;
              candidate: string;
              project: string;
            }[],
          };
        } catch (error: any) {
          return { error: error || "Could not get msdt data" };
        }
      },
    }),
    createDisc: build.mutation<
      {
        id: string;
        label: string;
        behavior: string;
        description: string;
        jobs: string;
        type: string;
        name: string;
        candidate: string;
        project: string;
        disc_score: {
          id: string;
          d_score: number;
          i_score: number;
          s_score: number;
          c_score: number;
          disc: string;
        };
      },
      {
        disc: {
          label: string;
          behavior: string;
          description: string;
          jobs: string;
          type: string;
          name: string;
          candidate: string;
          project: string;
          disc_score: {
            d_score: number;
            i_score: number;
            s_score: number;
            c_score: number;
          };
        };
      }
    >({
      queryFn: async ({ disc }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/tool-psychotest/disc/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: disc,
          });

          return {
            data: result.data as {
              id: string;
              label: string;
              behavior: string;
              description: string;
              jobs: string;
              type: string;
              name: string;
              candidate: string;
              project: string;
              disc_score: {
                id: string;
                d_score: number;
                i_score: number;
                s_score: number;
                c_score: number;
                disc: string;
              };
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create disc data" };
        }
      },
    }),
    getDisc: build.query<
      {
        id: string;
        label: string;
        behavior: string;
        description: string;
        jobs: string;
        type: string;
        name: string;
        candidate: string;
        project: string;
        disc_score: {
          id: string;
          d_score: string;
          i_score: string;
          s_score: string;
          c_score: string;
          disc: string;
        }[];
      }[],
      {
        candidate_id: string;
        project_id: string;
      }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/disc?candidate_id=${candidate_id}&project_id=${project_id}/`;

          const result = await fetchWithBQ(endpoint);

          return {
            data: result.data as {
              id: string;
              label: string;
              behavior: string;
              description: string;
              jobs: string;
              type: string;
              name: string;
              candidate: string;
              project: string;
              disc_score: {
                id: string;
                d_score: string;
                i_score: string;
                s_score: string;
                c_score: string;
                disc: string;
              }[];
            }[],
          };
        } catch (error: any) {
          return { error: error || "Could not create disc data" };
        }
      },
    }),
    createCfit: build.mutation<
      {
        id: string;
        iq: number;
        rs: number;
        description: string;
        candidate: string;
        project: string;
        cfit_score: {
          id: string;
          total_correct: number;
          label: string;
          cfit: string;
        }[];
      },
      {
        cfit: {
          iq: number;
          rs: number;
          description: string;
          candidate: string;
          project: string;
          cfit_score: {
            total_correct: number;
            label: string;
          }[];
        };
      }
    >({
      queryFn: async ({ cfit }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/tool-psychotest/cfit/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: cfit,
          });

          return {
            data: result.data as {
              id: string;
              iq: number;
              rs: number;
              description: string;
              candidate: string;
              project: string;
              cfit_score: {
                id: string;
                total_correct: number;
                label: string;
                cfit: string;
              }[];
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create cfit data" };
        }
      },
    }),
    getCfit: build.query<
      {
        id: string;
        iq: number;
        rs: number;
        description: string;
        candidate: string;
        project: string;
        cfit_score: {
          id: string;
          total_correct: number;
          label: string;
          cfit: string;
        }[];
      }[],
      {
        candidate_id: string;
        project_id: string;
      }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/cfit?candidate_id=${candidate_id}&project_id=${project_id}/`;

          const result = await fetchWithBQ(endpoint);

          return {
            data: result.data as {
              id: string;
              iq: number;
              rs: number;
              description: string;
              candidate: string;
              project: string;
              cfit_score: {
                id: string;
                total_correct: number;
                label: string;
                cfit: string;
              }[];
            }[],
          };
        } catch (error: any) {
          return { error: error || "Could not create cfit data" };
        }
      },
    }),
    createIst: build.mutation<
      {
        id: string;
        iq: number;
        description: string;
        candidate: string;
        project: string;
        ist_score: {
          id: string;
          label: string;
          description: string;
          score: number;
          ist: string;
        }[];
      },
      {
        ist: {
          iq: number;
          description: string;
          candidate: string;
          project: string;
          ist_score: {
            label: string;
            description: string;
            score: number;
          }[];
        };
      }
    >({
      queryFn: async ({ ist }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/tool-psychotest/ist/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: ist,
          });

          return {
            data: result.data as {
              id: string;
              iq: number;
              description: string;
              candidate: string;
              project: string;
              ist_score: {
                id: string;
                label: string;
                description: string;
                score: number;
                ist: string;
              }[];
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create ist data" };
        }
      },
    }),
    getIst: build.query<
      {
        id: string;
        iq: number;
        description: string;
        candidate: string;
        project: string;
        ist_score: {
          id: string;
          label: string;
          description: string;
          score: number;
          ist: string;
        }[];
      }[],
      {
        candidate_id: string;
        project_id: string;
      }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/ist?candidate_id=${candidate_id}&project_id=${project_id}/`;

          const result = await fetchWithBQ(endpoint);

          return {
            data: result.data as {
              id: string;
              iq: number;
              description: string;
              candidate: string;
              project: string;
              ist_score: {
                id: string;
                label: string;
                description: string;
                score: number;
                ist: string;
              }[];
            }[],
          };
        } catch (error: any) {
          return { error: error || "Could not create ist data" };
        }
      },
    }),
    createKrapal: build.mutation<
      {
        id: string;
        panker: number;
        janker: number;
        hanker: number;
        tinker: number;
        titik_puncak: number;
        titik_terendah: number;
        total_hitungan: number;
        jumlah_jawaban_benar: number;
        jumlah_jawaban_salah: number;
        candidate: string;
        project: string;
        krapal_score: {
          id: string;
          no_column: number;
          time: number;
          right_answer: number;
          wrong_answer: number;
          total: number;
          krapal: string;
        }[];
      },
      {
        krapal: {
          panker: number;
          janker: number;
          hanker: number;
          tinker: number;
          titik_puncak: number;
          titik_terendah: number;
          total_hitungan: number;
          jumlah_jawaban_benar: number;
          jumlah_jawaban_salah: number;
          candidate: string;
          project: string;
          krapal_score: {
            no_column: number;
            time: number;
            right_answer: number;
            wrong_answer: number;
            total: number;
          }[];
        };
      }
    >({
      queryFn: async ({ krapal }, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const endpoint = `/tool-psychotest/krapal/`;

          const result = await fetchWithBQ({
            url: endpoint,
            method: "POST",
            body: krapal,
          });

          return {
            data: result.data as {
              id: string;
              panker: number;
              janker: number;
              hanker: number;
              tinker: number;
              titik_puncak: number;
              titik_terendah: number;
              total_hitungan: number;
              jumlah_jawaban_benar: number;
              jumlah_jawaban_salah: number;
              candidate: string;
              project: string;
              krapal_score: {
                id: string;
                no_column: number;
                time: number;
                right_answer: number;
                wrong_answer: number;
                total: number;
                krapal: string;
              }[];
            },
          };
        } catch (error: any) {
          return { error: error || "Could not create krapal data" };
        }
      },
    }),
    getKrapal: build.query<
      {
        id: string;
        panker: number;
        janker: number;
        hanker: number;
        tinker: number;
        titik_puncak: number;
        titik_terendah: number;
        total_hitungan: number;
        jumlah_jawaban_benar: number;
        jumlah_jawaban_salah: number;
        candidate: string;
        project: string;
        krapal_score: {
          id: string;
          no_column: number;
          time: number;
          right_answer: number;
          wrong_answer: number;
          total: number;
          krapal: string;
        }[];
      }[],
      {
        candidate_id: string;
        project_id: string;
      }
    >({
      queryFn: async (
        { candidate_id, project_id },
        _queryApi,
        _extraoptions,
        fetchWithBQ
      ) => {
        try {
          const endpoint = `/tool-psychotest/krapal?candidate_id=${candidate_id}&project_id=${project_id}/`;

          const result = await fetchWithBQ(endpoint);

          return {
            data: result.data as {
              id: string;
              panker: number;
              janker: number;
              hanker: number;
              tinker: number;
              titik_puncak: number;
              titik_terendah: number;
              total_hitungan: number;
              jumlah_jawaban_benar: number;
              jumlah_jawaban_salah: number;
              candidate: string;
              project: string;
              krapal_score: {
                id: string;
                no_column: number;
                time: number;
                right_answer: number;
                wrong_answer: number;
                total: number;
                krapal: string;
              }[];
            }[],
          };
        } catch (error: any) {
          return { error: error || "Could not create ist data" };
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreatePartnerMutation,
  useEditPartnerMutation,
  useGetPartnerByIdQuery,
  useGetPartnerQuery,
  useCreateLevelMutation,
  useGetLevelQuery,
  useGetPsychotestQuery,
  useGetPsychotestHistoryQuery,
  useGetPsychotestObservationQuery,
  useGetProjectQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useGetCandidateQuery,
  useCreateCandidateMutation,
  useGetCandidateByIdQuery,
  useEditCandidateMutation,
  useCreateMbtiMutation,
  useGetMbtiQuery,
  useGetPapiKostikQuery,
  useCreatePapiKostikMutation,
  useCreateMsdtMutation,
  useGetMsdtQuery,
  useCreateDiscMutation,
  useGetDiscQuery,
  useCreateCfitMutation,
  useGetCfitQuery,
  useCreateIstMutation,
  useGetIstQuery,
  useCreateKrapalMutation,
  useGetKrapalQuery,
  useGetMeQuery,
} = api;
