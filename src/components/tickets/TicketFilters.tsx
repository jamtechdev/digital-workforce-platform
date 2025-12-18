import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/data/mockData';

interface TicketFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  priorityFilter: string;
  onPriorityChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  showCompanyFilter?: boolean;
}

export function TicketFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  showCompanyFilter = false,
}: TicketFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by ticket # or subject..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-card"
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[160px] bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="waiting_response">Waiting Response</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
        </SelectContent>
      </Select>

      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[160px] bg-card">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCompanyFilter && (
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px] bg-card">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="comp-1">Acme Corp</SelectItem>
            <SelectItem value="comp-2">TechStart Inc</SelectItem>
            <SelectItem value="comp-3">Global Solutions</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
