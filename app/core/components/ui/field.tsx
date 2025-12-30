import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/core/lib/utils";

const fieldVariants = cva("group/field flex flex-col gap-1.5", {
	variants: {
		orientation: {
			vertical: "flex-col",
			horizontal: "flex-row items-center justify-between gap-3",
		},
	},
	defaultVariants: {
		orientation: "vertical",
	},
});

function Field({
	className,
	orientation,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
	return (
		<div
			data-slot="field"
			className={cn(fieldVariants({ orientation, className }))}
			{...props}
		/>
	);
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-group"
			className={cn("flex flex-col gap-4", className)}
			{...props}
		/>
	);
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="field-label"
			className={cn(
				"text-foreground text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[invalid=true]/field:text-destructive",
				className
			)}
			{...props}
		/>
	);
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="field-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function FieldError({
	className,
	errors,
	...props
}: React.ComponentProps<"p"> & {
	errors?: unknown;
}) {
	if (!errors) return null;

	const getErrorMessage = (error: unknown): string | null => {
		// 문자열인 경우
		if (typeof error === "string") {
			return error;
		}

		// 배열인 경우 첫 번째 요소 처리
		if (Array.isArray(error)) {
			if (error.length === 0) return null;
			return getErrorMessage(error[0]);
		}

		// 객체인 경우 (Zod 에러 등)
		if (error && typeof error === "object") {
			// message 속성이 있는 경우
			if ("message" in error && typeof error.message === "string") {
				return error.message;
			}
			// toString이 있는 경우
			if ("toString" in error && typeof error.toString === "function") {
				const str = error.toString();
				// [object Object]가 아닌 의미있는 문자열인 경우만
				if (str !== "[object Object]") {
					return str;
				}
			}
		}

		return null;
	};

	const errorMessage = getErrorMessage(errors);

	if (!errorMessage) return null;

	return (
		<p
			data-slot="field-error"
			className={cn("text-destructive text-sm font-medium", className)}
			role="alert"
			aria-live="polite"
			{...props}
		>
			{errorMessage}
		</p>
	);
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-content"
			className={cn("flex flex-1 flex-col gap-1.5", className)}
			{...props}
		/>
	);
}

export {
	Field,
	FieldGroup,
	FieldLabel,
	FieldDescription,
	FieldError,
	FieldContent,
};
