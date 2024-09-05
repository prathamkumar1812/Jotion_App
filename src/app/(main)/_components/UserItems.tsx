import React from 'react'
import { Avatar,AvatarImage } from '@radix-ui/react-avatar'
import { ChevronsLeftRight } from 'lucide-react'
import { DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu'
import { useUser } from '@clerk/clerk-react'

type Props = {}

export default function UserItems({}: Props) {
  const {user}=useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <div role='button' className='flex text-sm items-center  w-full p-3  hover:bg-primary/5'>
        <div className='max-w-[150px] flex items-center gap-x-2'>
         <Avatar className='h-10 w-10'>
          <AvatarImage src={user?.imageUrl} alt={user.fullName} />
         </Avatar>
         <span className='text-start font-medium line-clamp-1'>
          {user.fullName}&apos;s Zotion
         </span>
        </div>
        <ChevronsLeftRight className=' rotate-90 text-muted-foreground w-4 h-4 ml-2' />
       </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}