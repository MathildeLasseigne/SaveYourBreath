import GlobalMap from "../../components/GlobalMap/GlobalMap";
import Navbar from "../../components/navbar/Navbar";
import AppHeader from "../../components/appheader/AppHeader";

function HomePage() {
    return (
        <>
            <AppHeader className="small" />
            <GlobalMap />
            <Navbar />
        </>
    );
}

export default HomePage;