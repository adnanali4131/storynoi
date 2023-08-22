import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({ list, selected, setSelected }) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              Select Genre
            </Listbox.Label>
            <div className="relative w-full mt-4">
              <Listbox.Button className="relative cursor-default rounded-lg bg-white p-[10px] text-left text-gray-900 border focus:outline-none  sm:text-sm sm:leading-6 w-full">
                <span className="flex items-center">
                  <Image
                    src={selected.avatar}
                    alt=""
                    width={100}
                    height={100}
                    className="flex-shrink-0 w-5 h-5 rounded-full"
                  />
                  <span className="block ml-3 truncate">{selected.name}</span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {list.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <Image
                              src={person.avatar}
                              alt=""
                              width={100}
                              height={100}
                              className="flex-shrink-0 w-5 h-5 rounded-full"
                            />
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
