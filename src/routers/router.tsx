import React, { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routePath';
import { MESSAGES } from '@/constants/message';
import Layout from '@/components/common/Layout/Layout';
import AuthGuard from './AuthGuard';

// Lazy-loaded components
const Main = React.lazy(() => import('@/pages/Main/Main'));
const ChannelContent = React.lazy(() => import('@/components/channel/ChannelContent/ChannelContent'));
const PostList = React.lazy(() => import('@/components/post/PostList/PostList'));
const PostDetail = React.lazy(() => import('@/components/post/PostDetail/PostDetail'));
const Callback = React.lazy(() => import('@/pages/Callback/Callback'));
const Landing = React.lazy(() => import('@/pages/Landing/Landing'));
const ErrorPage = React.lazy(() => import('@/pages/Error/Error')); 

// 채널이 선택되지 않았을 때 보여줄 컴포넌트
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
      <Route
        path={ROUTE_PATH.root}
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Landing />} />
        
        {/* 인증이 필요한 모든 경로는 AuthGuard 아래에 둡니다. */}
        <Route element={<AuthGuard />}>
          {/* ✅ 수정: Main 컴포넌트를 공통 레이아웃으로 사용합니다. */}
          {/* 이 라우트의 자식들은 모두 Main 컴포넌트의 Outlet에 렌더링됩니다. */}
          <Route element={<Main />}>
            {/* 1. /main으로 접속하면 "채널 선택" 메시지를 보여줍니다. */}
            <Route path={ROUTE_PATH.main} element={<NoChannelSelected />} />

            {/* 2. /channels/:channelId 로 접속하면 ChannelContent를 보여줍니다. */}
            <Route path={ROUTE_PATH.channelId} element={<ChannelContent />}>
              <Route index element={<PostList />} />
              <Route path={ROUTE_PATH.postId} element={<PostDetail />} />
            </Route>
            
            {/* 향후 프로필 페이지 등 사이드바가 필요한 페이지를 여기에 추가할 수 있습니다. */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Route>
        </Route>
      </Route>

      <Route path={ROUTE_PATH.authCallback} element={<Callback />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default router;