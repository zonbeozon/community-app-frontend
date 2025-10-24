import React, { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routePaths';
import { MESSAGES } from '@/constants/messages';
import Layout from '@/components/common/Layout/Layout';
import AuthGuard from './AuthGuard';

const Main = React.lazy(() => import('@/pages/Main/Main'));
const ChannelContent = React.lazy(() => import('@/components/channel/ChannelContent/ChannelContent'));
const PostList = React.lazy(() => import('@/components/post/PostList/PostList'));
const PostDetail = React.lazy(() => import('@/components/post/PostDetail/PostDetail'));
const Callback = React.lazy(() => import('@/pages/Callback/Callback'));
const Landing = React.lazy(() => import('@/pages/Landing/Landing'));
const ErrorPage = React.lazy(() => import('@/pages/Error/Error'));

const NoChannelSelected = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
    <p>{MESSAGES.NO_SELECTED_CHANNEL}</p>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Suspense fallback={<div>페이지를 불러오는 중입니다...</div>}><Outlet /></Suspense>}
      errorElement={<ErrorPage />}
    >
      <Route element={<Outlet />}>
        <Route element={<Layout><Outlet /></Layout>}>
          
          <Route path={ROUTE_PATH.root} element={<Landing />} />

          <Route element={<AuthGuard />}>
            <Route element={<Main />}>
              <Route path={ROUTE_PATH.main} element={<NoChannelSelected />} />
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
    </Route>
  )
);

export default router;