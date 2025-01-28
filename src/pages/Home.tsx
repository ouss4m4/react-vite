import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <header
        style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
        <Button>
          <Link to="/login"> Login</Link>
        </Button>
      </header>
      <main className="flex flex-col items-center">
        <h1>Welcome to Our AI Service</h1>
        <p>Your one-stop solution for all AI needs</p>
        <img
          src="https://picsum.photos/600/400"
          alt="Placeholder"
          style={{ margin: "20px 0" }}
        />
        <p>
          Our service provides cutting-edge AI solutions to help you achieve
          your goals.
        </p>
      </main>
    </div>
  );
}
