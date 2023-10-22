import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const typographyPropsVariants = cva(
	"",
	{
		variants: {
			variant: {
				h1: "text-4xl font-bold leading-10 tracking-tight",
				h2: "text-3xl font-bold leading-9 tracking-tight",
				h3: "text-2xl font-bold leading-9 tracking-tight",
				h4: "text-xl font-bold leading-5 tracking-tight",
				h5: "text-lg font-bold leading-5 tracking-tight",
				h6: "text-base font-bold leading-6 tracking-tight",
				subtitle1: "text-lg font-medium leading-7 tracking-tight",
				subtitle2: "text-base font-medium leading-6 tracking-tight",
				body1: "text-base leading-6 tracking-tight",
				body2: "text-sm leading-5 tracking-tight",
				button: "text-base font-medium leading-6 tracking-tight",
				caption: "text-sm leading-5 tracking-tight",
				overline: "text-sm font-medium leading-5 tracking-tight",
			},
			colorText: {
				default: "text-gray-900 dark:text-gray-50",
				primary: "text-blue-600 dark:text-blue-400",
				secondary: "text-gray-600 dark:text-gray-400",
				disabled: "text-gray-400 dark:text-gray-600",
				success: "text-green-600 dark:text-green-400",
				error: "text-red-600 dark:text-red-400",
				warning: "text-yellow-600 dark:text-yellow-400",
				info: "text-blue-600 dark:text-blue-400",
			},
		},
		defaultVariants: {
			variant: "h1",
			colorText: "default",
		},
	}
)

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyPropsVariants> {
	component?: React.ElementType;
}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(({ className, variant, colorText, component: Element = 'p', ...props }, ref) => (
	<Element
		ref={ref}
		className={cn(
			'',
			typographyPropsVariants({ variant, colorText }),
			className
		)}
		{...props}
	/>
))
Typography.displayName = "Typography"

export { Typography }

