import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { Input } from "./input";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Skeleton } from "./skeleton";
import { LoadingSpinner } from "./LoadingSpinner";

export function AutoComplete({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = "No items.",
  placeholder = "Search...",
}) {
  const [open, setOpen] = useState(false);
  const uniqueItems = items.filter(
    (item, index) => index === items.findIndex((el) => el.name === item.name),
  );
    const inputRef = useRef(null);


  const onSelectItem = (inputValue) => {
    if (inputValue.label === selectedValue.label) {
      onSearchValueChange("");
    } else {
      onSelectedValueChange(inputValue);
      onSearchValueChange(inputValue.label ?? "");
    }
    inputRef.current.blur();
    setOpen(false);
  };
  // const onInputBlur = () => {
  //   onSearchValueChange(" ");
  // };
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <Command className="relative" shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              // onBlur={onInputBlur}
              className="w-64 max-sm:w-44"
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
            >
              <Input
                      ref={inputRef}

                onChange={(e) => onSearchValueChange(e.target.value)}
                value={searchValue}
                className="pr-8"
                placeholder={placeholder}
              />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {searchValue !== "" && (
            <button
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full"
              onClick={() => onSearchValueChange("")}
            >
              <span className="text-2xl text-red-500">&times;</span>
            </button>
          )}
          {!open && <CommandList aria-hidden="true" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList className={`${searchValue === "" ? "hidden" : ""}`}>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="overflow-hidden p-1">
                    <Skeleton className="h-6 w-full">
                      <LoadingSpinner className={"mx-auto"} />
                    </Skeleton>
                  </div>
                </CommandPrimitive.Loading>
              )}
              {uniqueItems.length > 0 && !isLoading ? (
                <CommandGroup>
                  {uniqueItems.map((option) => (
                    <CommandItem
                      key={option.id}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={() =>
                        onSelectItem({
                          lat: option.latitude,
                          lon: option.longitude,
                          label: option.name,
                        })
                      }
                    >
                      {option.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading && searchValue !== "" ? (
                <CommandEmpty className="p-2 text-sm">
                  {emptyMessage ?? "No items."}
                </CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
