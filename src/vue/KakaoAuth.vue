<template>
  <div>카카오 로그인 중...</div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const fetchToken = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      try {
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

        const { access_token } = response.data;

        const userResponse = await axios.get(
            'https://kapi.kakao.com/v2/user/me',
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
        );

        console.log('사용자 정보:', userResponse.data);
        localStorage.setItem('TMDb-Key', access_token);

        router.push('/');
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        router.push('/signin');
      }
    };

    fetchToken();

    return {};
  },
};
</script>
