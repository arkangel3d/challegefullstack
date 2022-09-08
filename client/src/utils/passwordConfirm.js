
export const confirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return false;
    }
    return true;
};