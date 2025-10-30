'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import Flyout from '../components/flyout'
import FlyoutFull from '../components/flyoutFull'
import SimpleFlyout from '../components/simpleFlyout'

export default function DefaultNavBar({ config, onScrolledChange, scrollThreshold = 10 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > scrollThreshold
      setScrolled((prev) => {
        if (prev !== next) {
          if (typeof onScrolledChange === 'function') {
            onScrolledChange(next)
          }
        }
        return next
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onScrolledChange, scrollThreshold])

  return (
    <header
      className={`${config?.sticky ? 'sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70' : 'relative z-10'} isolate bg-white`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" aria-label={config.logoAlt || 'Home'}>
            {config.logo ? (
              <img
                alt={config.logoAlt || 'Logo'}
                src={config.logo}
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-8 md:h-14' : 'h-12 md:h-20'}`}
              />
            ) : (
              <div className={`h-auto transition-all duration-300 ${scrolled ? 'w-28' : 'w-32'}`}>
                <h1 className={`transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
                  {config.fallbackText || '<NovaNav>'}
                </h1>
              </div>
            )}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* Desktop Navigation */}
          {config.menuItems.map((item) => {
            const type = item.type || (item.full ? 'full' : 'default')
            if (item.subMenu) {
              if (type === 'full') return <FlyoutFull key={item.id || item.title} item={item} onHover={item.onHover} />
              if (type === 'simple') return <SimpleFlyout key={item.id || item.title} item={item} onHover={item.onHover} />
              return <Flyout key={item.id || item.title} item={item} onHover={item.onHover} />
            }
            return item.useLink ? (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.title}
              </Link>
            ) : (
              <a
                key={item.id}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.title}
              </a>
            )
          })}
        </PopoverGroup>

        <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end">
          {config.login && (
            <a
              href={config.loginHref}
              className="text-sm/6 font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
          {config.cta && (
            <a
              href={config.ctaBtnHref}
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {config.ctaTitle || 'Sign up'}
            </a>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              aria-label={config.logoAlt || 'Home'}
            >
              {config.logo ? (
                <img
                  alt={config.logoAlt || 'Logo'}
                  src={config.logo}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-lg font-semibold">
                  {config.fallbackText || 'NEXGEN Roofing Systems'}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* check if menu item has sub menu */}

                {/* Regular Navigation Items. NOT SUP/FLYOUT MENUS */}
                {config.menuItems.map((item) =>
                  item.subMenu ? (
                    <Disclosure key={item.id} as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        {item.title}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...item.subMenu, ...(item.ctas || [])].map(
                          (subItem) => (
                            <DisclosureButton
                              key={subItem.title}
                              as="a"
                              href={subItem.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                              {subItem.title}
                            </DisclosureButton>
                          ),
                        )}
                      </DisclosurePanel>
                    </Disclosure>
                  ) : item.useLink ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <a
                      key={item.id}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.title}
                    </a>
                  ),
                )}
              </div>
              <div className="space-y-2 py-6">
                {config.login && (
                  <a
                    href={config.loginHref}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                {config.cta && (
                  <a
                    href={config.ctaBtnHref}
                    className="-mx-3 block rounded-lg bg-gray-900 px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                  >
                    {config.ctaTitle || 'Sign up'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
