// components/QueryModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QueryModalProps {
  query: string;
  triggerLabel?: string;
}

export const QueryModal: React.FC<QueryModalProps> = ({
  query,
  triggerLabel = "View SQL",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle> SQL Query</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            This is the SQL query that will be executed.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[300px] border rounded-md p-4 text-sm font-mono bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
          {query}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
