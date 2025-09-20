
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PlaceholderPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under construction. Check back later for content on Circular Linked Lists!</p>
        </CardContent>
      </Card>
    </div>
  );
}
