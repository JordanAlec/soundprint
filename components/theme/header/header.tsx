import RecIndicator from "./rec-indicator";
import HeaderTitle from "./header-title";
import HeaderNav from "./header-nav";

export default function Header() {
    return (
        <header className="flex items-center justify-between py-5 sm:py-6 lg:py-8">
            <HeaderTitle />
            <div className="flex items-center gap-5">
                <HeaderNav />
                <RecIndicator />
            </div>
        </header>
    );
}