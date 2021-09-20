
// Service to check authentication for user and to signOut
const Auth = {
    roles: ['guest', 'user_level_1', 'user_level_2', 'admin', 'owner', 'superadmin', 'cms_admin', 'kam_admin'],
    setSessionDataToStorage(sessionData) {
        localStorage.setItem('session_data', JSON.stringify(sessionData));
    },
    signOut() {
        localStorage.removeItem("session_data");
        //todo remove
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("persist:root");



        // if (isTestEnv) {
        //     console.log('TEST ENV - GO TO: ' + `https://asmptest.a1.rs/asmp/logout?reloginDisableAutologin=https://a1.rs/${urlPrefix}`)
        //     window.location.href = `https://asmptest.a1.rs/asmp/logout?reloginDisableAutologin=https://a1.rs/${urlPrefix}`;
        // } else {
        //     window.location.href = `https://asmp.a1.rs/asmp/logout?reloginDisableAutologin=https://a1.rs/${urlPrefix}`;
        // }

    },
    isAuth() {
        const role = this.getRoleFromStorage();
        const sessionId = this.getSessionIdFromStorage();
        return !!(sessionId && role && role !== 'invalid');
    },
    getRoleFromStorage() {
        const sessionData = JSON.parse(localStorage.getItem("session_data"));
        if (sessionData) {
            const { session_id, user_type } = sessionData;
            if (session_id && user_type && user_type !== 'invalid') {
                return user_type;
            }
        }
        return null;
    },
    getSessionIdFromStorage() {
        const sessionData = JSON.parse(localStorage.getItem("session_data"));
        if (sessionData) {
            const { session_id, user_type } = sessionData;
            if (session_id && user_type && user_type !== 'invalid') {
                return session_id;
            }
        }
        return null;
    },
    getRole() {
        if (this.isAuth()) {
            const role = this.getRoleFromStorage();
            if (role && this.roles.includes(role)) {
                return role;
            }
        }

        return 'guest';
    },
    isUser() {
        return this.getRole() === 'user_level_1' || this.getRole() === 'user_level_2';
    }
};
export default Auth;
