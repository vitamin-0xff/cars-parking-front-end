import { Edit, Save, View } from "lucide-react"
import { Button } from "../button"

function PageHeader({ title, subtitle, onEditRequest, onViewRequest, onConfirmRequest }: { title: string, subtitle: string, 
  onEditRequest?: () => void,
  onViewRequest?: () => void,
  onConfirmRequest?: () => void,
}) {

            return (<div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
              </div>
              {
                (onEditRequest || onViewRequest || onConfirmRequest) && <div className="flex gap-2">
                  {
                    onEditRequest && (
                    <Button variant="outline" className="hover:text-primary cursor-pointer" onClick={onEditRequest}>
                      <Edit />
                    </Button>
                    ) 
                    
                  }
                  {
                    onViewRequest && 
                    <Button className="hover:text-primary cursor-pointer" variant="outline" onClick={onViewRequest}>
                      <View />
                    </Button>
                  }
                  {
                    onConfirmRequest && 
                    <Button className="hover:text-primary cursor-pointer" variant="outline" onClick={onConfirmRequest}>
                      <Save />
                    </Button>
                    }
                </div>  
              }
            </div>)
}

export { PageHeader }