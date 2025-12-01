import { NextRequest, NextResponse } from 'next/server'
import { registerEvent } from '@/lib/db'

/**
 * POST /api/register
 * 이벤트 참여 신청을 처리하는 API 엔드포인트
 * 요청 본문: { name, mobile, email }
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 데이터 추출
    const body = await request.json()
    const { name, mobile, email } = body

    // 필수 필드 검증
    if (!name || !mobile || !email) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 휴대폰 번호 형식 검증 (숫자와 하이픈만 허용)
    const mobileRegex = /^[0-9\-]+$/
    if (!mobileRegex.test(mobile)) {
      return NextResponse.json(
        { error: '유효한 휴대폰 번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 데이터베이스에 저장
    const result = await registerEvent(name, mobile, email)

    if (result.success) {
      return NextResponse.json(
        { message: '신청이 완료되었습니다!', data: result.data },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
