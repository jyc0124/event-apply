import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * 메타데이터 설정
 * SEO 최적화를 위한 기본 정보
 */
export const metadata: Metadata = {
  title: '2025년 연말 파티 - 참여 신청',
  description: '2025년 연말 파티 행사 참여 신청 페이지입니다. 강남역 오리엔탈라운지에서 개최됩니다.',
  keywords: ['연말파티', '행사', '신청'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
        {/* 토스트 알림 컴포넌트 */}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
