import RecIndicator from "./rec-indicator";
import HeaderTitle from "./header-title";

export default function Header() {
    return (
        <header className="flex items-center justify-between py-5 sm:py-6 lg:py-8">
            <HeaderTitle />
            <RecIndicator />
        </header>
    );
}