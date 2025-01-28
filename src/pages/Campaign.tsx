import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Campaigns() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex justify-between">
        <h1 className="text-lg">Campaigns List</h1>
        <div className="flex gap-2">
          <Button variant="outline">EXPORT</Button>
          <Button asChild>
            <Link to="/campaigns/create">Create Campaign</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
