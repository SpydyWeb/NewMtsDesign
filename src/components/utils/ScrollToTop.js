import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
    useEffect(() => {
        document.getElementById("main")?.scrollTo({ top: 0 });
    }, [pathname]);
    return children || null;
};
export default ScrollToTop;
