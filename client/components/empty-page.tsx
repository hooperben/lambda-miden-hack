import SignIn from "./sign-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmptyPage = () => {
  return (
    <div className="flex justify-center mt-[200px]">
      <Card className="w-[400px] text-center">
        <CardHeader>
          <CardTitle>Sendooor</CardTitle>
          <CardDescription>
            For all your Polygon Miden sending needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-8">
            <SignIn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyPage;
