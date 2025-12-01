'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

/**
 * 이벤트 참여 신청 페이지
 * 사용자로부터 이름, 휴대폰 번호, 이메일을 받아 DB에 저장
 */
export default function Home() {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
  })

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false)

  /**
   * 입력 필드 변경 핸들러
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * 폼 제출 핸들러
   * API에 데이터를 전송하고 응답 처리
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // API 호출
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // 성공 메시지 표시
        toast.success('신청이 완료되었습니다!')
        // 폼 초기화
        setFormData({ name: '', mobile: '', email: '' })
      } else {
        // 에러 메시지 표시
        toast.error(data.error || '신청 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('서버 연결 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              2025년 연말 파티
            </h1>
            <p className="text-slate-600 text-sm">
              행사 참여 신청
            </p>
          </div>

          {/* 행사 정보 */}
          <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl p-[2px] mb-8 overflow-hidden">
            {/* 애니메이션 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

            <div className="relative bg-white rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                  📅
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">날짜</div>
                  <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    2025년 12월 24일
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                  📍
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">장소</div>
                  <div className="text-lg font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    강남역 오리엔탈라운지
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 신청 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이름 입력 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                이름 *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {/* 휴대폰 번호 입력 */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-2">
                휴대폰 번호 *
              </label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="010-0000-0000"
                value={formData.mobile}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                이메일 *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {/* 제출 버튼 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded-lg transition-colors"
            >
              {isLoading ? '신청 중...' : '신청하기'}
            </Button>
          </form>

          {/* 안내 문구 */}
          <p className="text-xs text-slate-500 text-center mt-6">
            입력하신 정보는 행사 안내 목적으로만 사용됩니다.
          </p>
        </div>
      </Card>
    </div>
  )
}
