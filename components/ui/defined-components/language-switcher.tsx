'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { supportedLanguages, type SupportedLanguage } from '@/config/i18'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng)
  }

  const currentLanguage = supportedLanguages.find(
    (lang) => lang.code === i18n.language
  ) || supportedLanguages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={currentLanguage.name}>
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={i18n.language === language.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}