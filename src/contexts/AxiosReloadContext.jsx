import { createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { axiosReload } from "../utils/axios/axiosReload";
import PropTypes from "prop-types";

export const AxiosReloadContext = createContext({
    axiosReload,
});

export const AxiosContentProvider = ({ children }) => {
  const { getNewAccessToken, accessToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosReload.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosReload.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originRequest = error?.config;
        if (error.response?.status === 401 && !originRequest?.sent) {
          originRequest.sent = true;

          try {
            const response = await getNewAccessToken();

            const { access_token } = response;

            originRequest.headers["Authorization"] = `Bearer ${access_token}`;

            return axiosReload(originRequest);
          } catch (err) {
            console.error(err);
          }

          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosReload.interceptors.request.eject(requestInterceptor);
      axiosReload.interceptors.response.eject(responseInterceptor);
    };
  }, [getNewAccessToken, accessToken]);

  const axiosContextValue = {
    axiosReload,
  };

  return (
    <AxiosReloadContext.Provider value={axiosContextValue}>
      {children}
    </AxiosReloadContext.Provider>
  );
};

AxiosContentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
