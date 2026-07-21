'use client';

import { Bell, Info, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FieldWrapper,
  MobileNav,
  NavItem,
  NavToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Switch,
  Textarea,
  TextInput,
  Tooltip,
  useToast,
} from '@/components';

import { Demo } from './_parts';

/**
 * Interactive showcase demos (Sprint 02 §12) — client-only.
 *
 * Exercises the stateful/overlay components so their open/close, keyboard and
 * focus behaviour can be validated by hand. Not part of the library.
 */
export function InteractiveDemos() {
  const { toast } = useToast();
  const [progress, setProgress] = useState(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [invalid, setInvalid] = useState(true);

  return (
    <>
      <Demo label="Forms — a wired, validatable field">
        <div className="w-full max-w-sm">
          <FieldWrapper
            label="Email address"
            required
            helperText="We only use it to reply."
            error={invalid ? 'Enter a valid email address.' : undefined}
          >
            {(props) => (
              <TextInput
                type="email"
                placeholder="you@example.com"
                {...props}
              />
            )}
          </FieldWrapper>
          <div className="mt-3">
            <Button
              size="sm"
              variant="tertiary"
              onClick={() => setInvalid((v) => !v)}
            >
              Toggle invalid
            </Button>
          </div>
        </div>
      </Demo>

      <Demo label="Forms — controls">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <FieldWrapper label="Message">
            {(props) => <Textarea placeholder="Say hello…" {...props} />}
          </FieldWrapper>
          <FieldWrapper label="Role">
            {(props) => (
              <Select placeholder="Choose a role" triggerProps={props}>
                <SelectItem value="fe">Frontend</SelectItem>
                <SelectItem value="be">Backend</SelectItem>
                <SelectItem value="full">Full-stack</SelectItem>
              </Select>
            )}
          </FieldWrapper>
          <Checkbox label="Subscribe to updates" defaultChecked />
          <Switch label="Enable notifications" defaultChecked />
          <RadioGroup defaultValue="a" aria-label="Pick one">
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
        </div>
      </Demo>

      <Demo label="Feedback — toast (click to fire)">
        <Button
          leadingIcon={Bell}
          onClick={() =>
            toast({
              status: 'success',
              title: 'Saved',
              description: 'Your changes are live.',
            })
          }
        >
          Fire a toast
        </Button>
      </Demo>

      <Demo label="Feedback — progress">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Progress value={progress} label="Upload progress" />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="tertiary"
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
            >
              −10
            </Button>
            <Button
              size="sm"
              variant="tertiary"
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
            >
              +10
            </Button>
          </div>
        </div>
      </Demo>

      <Demo label="Overlays — Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Open dialog</Button>
          </DialogTrigger>
          <DialogContent
            title="Delete this item?"
            description="This action cannot be undone."
          >
            <div className="mt-4 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button leadingIcon={Trash2}>Delete</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </Demo>

      <Demo label="Overlays — Popover · Tooltip · Menus">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="tertiary" leadingIcon={Info}>
              Popover
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            A non-modal floating panel. Click outside or press Esc to dismiss.
          </PopoverContent>
        </Popover>

        <Tooltip content="A hint on hover and focus">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="tertiary" leadingIcon={Settings}>
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ContextMenu>
          <ContextMenuTrigger className="border-hairline text-mute text-small rounded-sm border border-dashed px-4 py-2">
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Inspect</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Demo>

      <Demo label="Navigation — MobileNav (Drawer) + NavToggle">
        <MobileNav
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          title="Menu"
          trigger={
            <NavToggle
              open={mobileOpen}
              onToggle={() => setMobileOpen((o) => !o)}
              controls="showcase-mobile-nav"
            />
          }
        >
          <li>
            <NavItem href="#" current>
              Home
            </NavItem>
          </li>
          <li>
            <NavItem href="#">Work</NavItem>
          </li>
          <li>
            <NavItem href="#">About</NavItem>
          </li>
        </MobileNav>
      </Demo>
    </>
  );
}
