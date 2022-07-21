import type { RequestHandler } from "@sveltejs/kit";
import cookie from 'cookie';

export const post: RequestHandler = async (event) => {
  const payload = await event.request.json();
  const token: string = payload.token || '';
  return {
    /*
      브라우저에서 쿠키에 접근할 수 없도록 제한한다. Http only Cookie를 활성화시켜 XSS 공격을 차단한다. 쿠키 탈취 예방을 위해 secure 옵션을 배포된 production에서만 true로 설정한다. 퍼스트 파트 쿠키만 전송시키도록 값을 strict으로 할당한다.
    */
    headers: {
      'set-cookie': cookie.serialize('token', token, {
        path: '/',
        sameSite: 'strict',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })
    }
  }
}