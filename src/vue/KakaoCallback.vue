<template>
  <div class="kakao-auth">
    <p>🔄 Processing Kakao Login...</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const handleKakaoAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('❌ Authorization code is missing');
        }

        // ✅ 액세스 토큰 요청
        const response = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            null,
            {
              params: {
                grant_type: 'authorization_code',
                client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
                redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
                code,
              },
            }
        );

        const {access_token} = response.data;

        if (!access_token) {
          throw new Error('❌ Failed to retrieve access token');
        }

        // ✅ 사용자 정보 요청
        const userResponse = await axios.get(
            'https://kapi.kakao.com/v2/user/me',
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );

        const userData = userResponse.data;
        const nickname = userData.kakao_account?.profile?.nickname || 'KakaoUser';
        const kakaoId = `kakao_${userData.id}`;

        // ✅ 사용자 정보 저장
        sessionStorage.setItem('TMDb-Key', import.meta.env.VITE_TMDB_API_KEY);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user-nickname', nickname);
        sessionStorage.setItem('kakao-id', kakaoId);

        // ✅ 사용자 정보 로컬 스토리지 업데이트
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (!users.some(user => user.id === kakaoId)) {
          users.push({id: kakaoId, password: access_token});
          localStorage.setItem('users', JSON.stringify(users));
        }

        console.info('✅ Kakao Login Successful');
        router.push('/'); // 메인 화면으로 이동
      } catch (error) {
        console.error('❌ Kakao Auth Error:', error);
        alert('Kakao 로그인에 실패했습니다. 다시 시도해주세요.');
        router.push('/signin'); // 로그인 화면으로 이동
      }
    };

    handleKakaoAuth();

    return {};
  },
};
</script>

<style scoped>
.kakao-auth {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
