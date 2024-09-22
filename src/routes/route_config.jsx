import { routeAccess } from "../constants/route_access";
import { DefaultLayout } from "../layout";
import { HomePage, LoginPage, PostPage, SettingPage, TodoPage } from "../pages";

export const RouteConfigs = [
  {
    path: "/",
    element: (
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    ),
    access_type: routeAccess.public,
  },
  {
    path: "/todo",
    element: (
      <DefaultLayout>
        <TodoPage />
      </DefaultLayout>
    ),
    access_type: routeAccess.public,
  },
  {
    path: "/post",
    element: (
      <DefaultLayout>
        <PostPage />
      </DefaultLayout>
    ),
    access_type: routeAccess.public,
  },
  {
    path: "/setting",
    element: (
      <DefaultLayout>
        <SettingPage />
      </DefaultLayout>
    ),
    access_type: routeAccess.private,
  },
  {
    path: "/login",
    element: <LoginPage />,
    access_type: routeAccess.auth,
  },
];
