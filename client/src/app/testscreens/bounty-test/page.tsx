import BountyCard from "@/app/bounties/_components/BountyCard";
import BountyPagination from "@/app/bounties/_components/BountyPagination";
import SearchBountites from "@/app/bounties/_components/SearchBountites";

export default function page() {
    return (
        <div>
            <SearchBountites/>
            {/* <BountyCard/> */}
            <BountyPagination/>
        </div>
    );
}