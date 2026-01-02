import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default () => {
    const navigator = useRouter();

    return (
        <main className="p-6">
            <div className="flex flex-col gap-2 w-full">
                <div>
                    <Button className="hover:text-gray-500" variant="outline" onClick={() => navigator.back()}>
                        <ArrowLeft />
                        <p>Back</p>
                    </Button>
                </div>
                <PageHeader title="New Country" subtitle="Create a new country here" />
            </div>
            <div className="div">
                <Card>
                    <CardHeader>
                        <CardTitle>Country's Data</CardTitle>
                        <CardDescription>
                            Country's information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Form to create a new country */}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}