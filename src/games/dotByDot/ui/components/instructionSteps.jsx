import { Stack } from '@/shared/uiKit/Stack';
import { Dot } from '../uiKit';
import { CodeStarIcon } from '@/shared/icons';
import { useTheme } from '@emotion/react';
import { Typography } from '@/shared/uiKit/Typography';
import { COLORS } from '../../const';
import { Eye } from '../uiKit/Eye';
import { Result } from './RowCheckButton';
import { CHECK_RESULTS } from '../../const';
import styled from '@emotion/styled';
import { useMemo } from 'react';


export const Instruction = () => {
    const theme = useTheme();
    const colors = useMemo(() => COLORS.slice(0, 4).sort(() => Math.random() - 0.5), []);

    return (
        <Stack direction="column" gap={6}>
            {steps.map((item) => {
                const Component = item.component;
                return (
                    <StyledCard key={item.id}>
                        <Stack
                            direction="column"
                            align="start"
                            justify="start"
                            gap={4}
                            height="fit"
                        >
                            {Component && <Component
                                theme={theme}
                                colors={colors}
                            />
                            }

                            <Typography variant="body.medium">
                                {item.description}
                            </Typography>
                        </Stack>
                    </StyledCard>
                );
            })}
        </Stack>
    );
};

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 24px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.sys.color.surfaceContainer.lowest};
`;

const StepOne = ({ theme }) => {
    return (
        <Stack direction='row' gap={0} height={250}>
            {[0, 1, 2, 3].map((colIndex) => (
                <Stack padding={1} key={colIndex} width='fit'>
                    <Dot size='small' color={theme.sys.color.surfaceContainer.low}>
                        <CodeStarIcon color={theme.sys.color.onSurface} />
                    </Dot>
                </Stack>
            ))}
        </Stack>
    )
}

const StepTwo = ({ theme, colors }) => {
    return (
        <Stack direction='row' gap={0} height={250}>
            <Stack padding={1} width='fit'>
                <Dot size="small" color={theme.sys.color.surfaceContainer.low}>
                    <Eye />
                </Dot>
            </Stack>
            {colors.map((color) => (
                <Stack padding={1} key={color} width='fit'>
                    <Dot size='xsmall' color={color}>
                    </Dot>
                </Stack>
            ))}
        </Stack>
    )
}

const StepThree = ({ theme, colors }) => {
    const resultColors = {
        'results-0': [CHECK_RESULTS.EXACT, CHECK_RESULTS.EXACT, CHECK_RESULTS.WRONG, CHECK_RESULTS.EXISTS],
    }
    return (
        <Stack direction='row' gap={0} height={250}>
            <Stack padding={1} width='fit'>
                <Dot size="small">
                    <Result rowIndex='0' colors={resultColors} />
                </Dot>
            </Stack>
            {colors.map((color) => (
                <Stack padding={1} key={color} width='fit'>
                    <Dot size='xsmall' color={color}>
                    </Dot>
                </Stack>
            ))}
        </Stack>
    )
}

const StepFour = ({ theme, colors }) => {
    const resultColors = {
        'results-0': [CHECK_RESULTS.EXACT, CHECK_RESULTS.EXACT, CHECK_RESULTS.EXACT, CHECK_RESULTS.EXACT],
    }

    return (
        <Stack direction='row' gap={0} height={250}>
            <Stack padding={1} width='fit'>
                <Dot size="small">
                    <Result rowIndex='0' colors={resultColors} />
                </Dot>
            </Stack>
            {colors.map((color) => (
                <Stack padding={1} key={color} width='fit'>
                    <Dot size='xsmall' color={color}>
                    </Dot>
                </Stack>
            )).reverse()}
        </Stack>
    )
}


export const steps = [
    {
        id: 0,
        description: 'Логическая игра, в которой нужно угадать зашифрованную комбинацию цветов. 🧠 Развивает логическое мышление — игрок постоянно сопоставляет данные и делает выводы. 🧠 Заставляет возвращаться к предыдущим решениям, чтобы заметить ошибки или верные шаги. 🧠 Формирует стратегическое мышление — каждое действие опирается на результаты прошлых ходов. 🧠 Помогает принимать решения на основе анализа, а не случайных попыток. 🧠 Превращает процесс в самообучение: игрок сам понимает, как менять стратегию, чтобы приблизиться к правильному ответу.',
    },
    {
        id: 1,
        image: '/Specification/instruction_1_slide_kidstart.jpg',
        description: 'Я установил цветовой код — расшифруйте его, указав цвет и позицию цветных кругов',
        component: StepOne,
    },
    {
        id: 2,
        image: '/Specification/instruction_2_slide_kidstart.jpg',
        description: 'Игра начинается с выбора цветов в 1 ряду (круги могут быть одного цвета). После выбора, появится глаз — жми на него для проверки.',
        component: StepTwo,
    },
    {
        id: 3,
        image: '/Specification/instruction_3_slide_kidstart.jpg',
        description: 'Результат выбора: белый круг с точкой показывает, что цвет совпал по цвету и позиции. Полупрозрачный круг - совпала только позиция. Нет круга - нет совпадений.',
        component: StepThree,
    },
    {
        id: 4,
        image: '/Specification/instruction_4_slide_kidstart.jpg',
        description: 'Игра заканчивается, когда все цвета в ряду совпали по цвету и расположению',
        component: StepFour,
    },


];