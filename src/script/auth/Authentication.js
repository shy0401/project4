// 일반 로그인 (이메일/비밀번호)
const tryLogin = (email, password, success, fail) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === email && user.password === password);

    if (user) {
        sessionStorage.setItem('TMDb-Key', user.password);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user-nickname', email.split('@')[0]);

        localStorage.setItem('isLoggedIn', 'true'); // 로컬스토리지에 로그인 상태 저장
        success(user);
    } else {
        fail();
    }
};

// 회원가입 (이메일/비밀번호)
const tryRegister = (email, password, success, fail) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.id === email);

        if (userExists) throw new Error('User already exists');

        users.push({ id: email, password });
        localStorage.setItem('users', JSON.stringify(users));
        success();
    } catch (err) {
        fail(err);
    }
};

// 카카오 로그인
const tryKakaoLogin = (success, fail) => {
    if (!window.Kakao) {
        console.error('Kakao SDK not loaded');
        fail('Kakao SDK not loaded');
        return;
    }

    window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: (authObj) => {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: (res) => {
                    const kakaoId = `kakao_${res.id}`;
                    const nickname = res.kakao_account?.profile?.nickname || 'KakaoUser';

                    // 세션스토리지에 사용자 정보 저장
                    sessionStorage.setItem('TMDb-Key', authObj.access_token);
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('user-nickname', nickname);
                    sessionStorage.setItem('kakao-id', kakaoId);

                    // 로컬스토리지에 사용자 정보 저장
                    localStorage.setItem('isLoggedIn', 'true'); // 로컬스토리지에 로그인 상태 저장

                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    if (!users.some(user => user.id === kakaoId)) {
                        users.push({ id: kakaoId, password: authObj.access_token });
                        localStorage.setItem('users', JSON.stringify(users));
                    }

                    success({ id: kakaoId, nickname });
                },
                fail: (error) => {
                    console.error('Failed to fetch Kakao user info:', error);
                    fail(error);
                },
            });
        },
        fail: (err) => {
            console.error('Kakao Login Failed:', err);
            fail(err);
        },
    });
};

// 로그아웃
const logout = () => {
    sessionStorage.clear();
    localStorage.removeItem('isLoggedIn'); // 로컬스토리지에서 로그인 상태 제거
    if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
            console.log('Kakao user logged out successfully');
        });
    }
    console.log('User logged out successfully');
};

export { tryLogin, tryRegister, tryKakaoLogin, logout };
