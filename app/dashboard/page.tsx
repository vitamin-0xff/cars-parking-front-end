'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/defined-components/page-header"
import MainContainer from "@/components/ui/main-container"
import { Pagination } from "@/components/ui/pagination"
import { useState } from "react"
import toast from "react-hot-toast"

export default () => {
    const [isAlertDialogOpend, setIsAlertDialogOpend] = useState(false)

    return <MainContainer>
        <PageHeader title="Dashboad" subtitle="from where you can manage your resources effectly" />
        <div className="flex mt-2 gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Welcome to the Dashboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        <div>
                            <p>
                            This is your main dashboard where you can monitor and manage all your resources effectively. Use the sidebar to navigate through different sections.
                            </p>
                            <div className="flex gap-2">
                                <Button title={"Click me!"} className="mt-4" onClick={() => {
                                    toast.success("Button clicked!", { duration: 2000 });
                                }}>Click me!</Button>
                                <Button title={"Click me!"} className="mt-4" onClick={() => {
                                    setIsAlertDialogOpend(true)
                                }}>Open dialog!</Button>
                            </div>
                        </div>
                    </CardDescription>  
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Welcome to the Dashboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        This is your main dashboard where you can monitor and manage all your resources effectively. Use the sidebar to navigate through different sections.
                    </CardDescription>  
                </CardContent>
            </Card>
        </div>
            <div className="flex gap-2">
                <div className="flex-1">
            <Pagination currentPage={1} totalPages={10} onPageChange={(page) => {
                console.log("Page changed to:", page);
            }} />
                </div>
                <div className="flex-1">

                </div>

            </div>
      <AlertDialog open={isAlertDialogOpend} onOpenChange={() => {}}>
        <AlertDialogContent className="bg-[var(--card)] border-[var(--border)] text-[var(--card-foreground)] ">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:hover:text-[var(--muted-foreground)]" onClick={() => {
                setIsAlertDialogOpend(false)
            }}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
                setIsAlertDialogOpend(false)
            }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainContainer>
}