import { Pool } from 'pg'

/**
 * PostgreSQL 연결 풀 생성
 * 환경 변수에서 데이터베이스 연결 정보를 읽어옴
 */
const pool = new Pool({
  connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/event_registration`,
})

/**
 * 이벤트 참여 신청 데이터를 데이터베이스에 저장
 * @param name - 신청자 이름
 * @param mobile - 휴대폰 번호
 * @param email - 이메일 주소
 * @returns 저장된 데이터 또는 에러
 */
export async function registerEvent(name: string, mobile: string, email: string) {
  try {
    const result = await pool.query(
      'INSERT INTO event_registrations (name, mobile, email) VALUES ($1, $2, $3) RETURNING *',
      [name, mobile, email]
    )
    return { success: true, data: result.rows[0] }
  } catch (error: any) {
    // 이메일 중복 에러 처리
    if (error.code === '23505') {
      return { success: false, error: '이미 등록된 이메일입니다.' }
    }
    return { success: false, error: error.message }
  }
}

/**
 * 모든 이벤트 참여자 조회 (관리자용)
 */
export async function getAllRegistrations() {
  try {
    const result = await pool.query('SELECT * FROM event_registrations ORDER BY created_at DESC')
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
