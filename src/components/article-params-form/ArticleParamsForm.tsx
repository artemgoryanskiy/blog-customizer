import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = () => {
	// Состояние сайдбара
	const [isOpen, setIsOpen] = useState(false);
	// Состояние настроек формы
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	// Начальные настройки
	const [initialState] = useState<ArticleStateType>(defaultArticleState);
	// Ref для корневого элемента
	const formRef = useRef<HTMLDivElement>(null);
	// Применения хука для закрытия при клике вне элемента
	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onChange: setIsOpen,
	});
	// Обработчик открытия/закрытия сайдбара
	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};
	// Применение CSS-переменных
	const applyStyles = (state: ArticleStateType) => {
		const root = document.querySelector('main');
		if (!root) {
			console.error('Элемент main не найден!');
			return;
		}

		root.style.setProperty('--font-family', state.fontFamilyOption.value);
		root.style.setProperty('--font-color', state.fontColor.value);
		root.style.setProperty('--bg-color', state.backgroundColor.value);
		root.style.setProperty('--container-width', state.contentWidth.value);
		root.style.setProperty('--font-size', state.fontSizeOption.value);
	};

	useEffect(() => {
		applyStyles(initialState);
	}, []);
	// Обработчик применения настроек
	const handleApply = () => {
		console.log('Вызван handleApply');

		applyStyles(formState);
	};
	// Оьработчик сброса настроек
	const handleReset = () => {
		setFormState({ ...initialState });
		applyStyles(initialState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};
	//Обработчки изменения настроек
	const handleFontFamilyChange = (options: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: options }));
	};
	const handleFontColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};
	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};
	const handleFontSizeChange = (options: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: options }));
	};
	const handleContentWidthChange = (options: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: options }));
	};
	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />

			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
