import React from 'react';
import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from '@/components/common/Layout/Layout';
import { ROUTE_PATH } from '@/constants/routePaths';
import { AuthGuard } from './AuthGuard';

const Main = React.lazy(() => import('@/pages/Main/Main'));
const ChattingGroupContent = React.lazy(() => import('@/components/chat/ChattingGroupContent/ChattingGroupContent'));
const ChannelContent = React.lazy(() => import('@/components/channel/ChannelContent/ChannelContent'));
const RecommendedPostList = React.lazy(() => import('@/components/post/RecommendedPostList/RecommendedPostList'));
const PostList = React.lazy(() => import('@/components/post/PostList/PostList'));
const PostDetail = React.lazy(() => import('@/components/post/PostDetail/PostDetail'));
const Callback = React.lazy(() => import('@/pages/Callback/Callback'));
const Landing = React.lazy(() => import('@/pages/Landing/Landing'));
const ErrorPage = React.lazy(() => import('@/pages/Error/Error'));


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Outlet />}>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path={ROUTE_PATH.root} element={<Landing />} />

          <Route element={<AuthGuard />}>
            <Route element={<Main />}>
              <Route path={ROUTE_PATH.main} element={<RecommendedPostList />} />
              <Route path={ROUTE_PATH.coinInfo} element={<ChattingGroupContent />}></Route>
              <Route path={ROUTE_PATH.channelId} element={<ChannelContent />}>
                <Route index element={<PostList />} />
                <Route path={ROUTE_PATH.postId} element={<PostDetail />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path={ROUTE_PATH.authCallback} element={<Callback />} />
      <Route path="*" element={<ErrorPage />} />
    </>,
  ),
);
