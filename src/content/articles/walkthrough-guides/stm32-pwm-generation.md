---
title: "PWM Generation on STM32 - Complete Guide"
description: "Step-by-step guide for implementing PWM generation on STM32 microcontrollers using HAL library"
pubDate: 2024-12-03
category: "Walkthrough Guides"
subcategory: "STM32 Development"
tags: ["stm32", "pwm", "timer", "hal", "embedded"]
---

# PWM Generation on STM32 - Complete Guide

Comprehensive walkthrough for implementing Pulse Width Modulation (PWM) on STM32 microcontrollers using STM32CubeIDE and HAL library.

## Overview

### What is PWM?
- Pulse Width Modulation technique
- Controls average power delivered to loads
- Common applications: motor control, LED dimming, DAC simulation
- Key parameters: frequency, duty cycle, resolution

### STM32 Timer Features
- Multiple timer peripherals (TIM1-TIM17 depending on variant)
- Up to 4 channels per timer
- Configurable prescaler and auto-reload values
- Complementary outputs with dead-time insertion

## Hardware Setup

### Required Components
- STM32 development board (Nucleo-F401RE used in this example)
- LED or oscilloscope for output verification
- Breadboard and jumper wires
- Optional: Logic analyzer for timing verification

### Pin Configuration
- TIM2_CH1: PA0 (Arduino A0 on Nucleo boards)
- TIM2_CH2: PA1 (Arduino A1)
- TIM2_CH3: PA2 (Arduino A2)
- TIM2_CH4: PA3 (Arduino A3)

## STM32CubeIDE Configuration

### Step 1: Create New Project

1. File → New → STM32 Project
2. Select your target MCU (STM32F401RE)
3. Choose project name and location
4. Select C language template

### Step 2: Clock Configuration

1. Open Clock Configuration tab
2. Set system clock to maximum frequency (84 MHz for F401RE)
3. Configure APB1 timer clocks (42 MHz typical)
4. Note: Timer clock = APB clock × 2 when APB prescaler > 1

### Step 3: Timer Configuration

1. Go to Pinout & Configuration tab
2. Navigate to Timers → TIM2
3. Set Clock Source to "Internal Clock"
4. Configure channels as needed:
   - Channel 1: PWM Generation CH1
   - Channel 2: PWM Generation CH2
   - Channel 3: PWM Generation CH3
   - Channel 4: PWM Generation CH4

### Step 4: PWM Parameters

Configure timer parameters:
- **Prescaler**: Determines timer frequency
- **Counter Period (ARR)**: Sets PWM resolution
- **Pulse (CCR)**: Sets initial duty cycle

Example calculation for 1 kHz PWM:
```
Timer Clock = 84 MHz
Desired PWM Frequency = 1 kHz
Prescaler = 84 - 1 (1 MHz timer frequency)
Counter Period = 1000 - 1 (1 kHz PWM)
```

### Step 5: Pin Assignment

1. Click on desired pins in pinout view
2. Assign to timer channels (TIM2_CH1, etc.)
3. Verify pin configuration in GPIO settings
4. Set output speed to High if needed

## Code Implementation

### Generated Code Structure

STM32CubeIDE generates initialization code:

```c
/* Timer handle declaration */
TIM_HandleTypeDef htim2;

/* Timer initialization function */
static void MX_TIM2_Init(void)
{
    TIM_ClockConfigTypeDef sClockSourceConfig = {0};
    TIM_MasterConfigTypeDef sMasterConfig = {0};
    TIM_OC_InitTypeDef sConfigOC = {0};

    htim2.Instance = TIM2;
    htim2.Init.Prescaler = 83;  // 84 MHz / 84 = 1 MHz
    htim2.Init.CounterMode = TIM_COUNTERMODE_UP;
    htim2.Init.Period = 999;    // 1 MHz / 1000 = 1 kHz
    htim2.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
    htim2.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
    
    if (HAL_TIM_Base_Init(&htim2) != HAL_OK)
    {
        Error_Handler();
    }
    
    sClockSourceConfig.ClockSource = TIM_CLOCKSOURCE_INTERNAL;
    if (HAL_TIM_ConfigClockSource(&htim2, &sClockSourceConfig) != HAL_OK)
    {
        Error_Handler();
    }
    
    if (HAL_TIM_PWM_Init(&htim2) != HAL_OK)
    {
        Error_Handler();
    }
    
    sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
    sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
    if (HAL_TIMEx_MasterConfigSynchronization(&htim2, &sMasterConfig) != HAL_OK)
    {
        Error_Handler();
    }
    
    sConfigOC.OCMode = TIM_OCMODE_PWM1;
    sConfigOC.Pulse = 500;  // 50% duty cycle initially
    sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
    sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;
    
    if (HAL_TIM_PWM_ConfigChannel(&htim2, &sConfigOC, TIM_CHANNEL_1) != HAL_OK)
    {
        Error_Handler();
    }
}
```

### Starting PWM Generation

Add to main function:

```c
int main(void)
{
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_TIM2_Init();

    /* Start PWM generation */
    HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);
    HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_2);
    HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_3);
    HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_4);

    while (1)
    {
        /* Main application loop */
    }
}
```

### Dynamic Duty Cycle Control

```c
void set_pwm_duty_cycle(TIM_HandleTypeDef *htim, uint32_t channel, float duty_percent)
{
    uint32_t pulse_value = (uint32_t)((duty_percent / 100.0) * (htim->Init.Period + 1));
    __HAL_TIM_SET_COMPARE(htim, channel, pulse_value);
}

/* Example usage */
set_pwm_duty_cycle(&htim2, TIM_CHANNEL_1, 25.0);  // 25% duty cycle
set_pwm_duty_cycle(&htim2, TIM_CHANNEL_2, 50.0);  // 50% duty cycle
set_pwm_duty_cycle(&htim2, TIM_CHANNEL_3, 75.0);  // 75% duty cycle
```

### Frequency Modification

```c
void set_pwm_frequency(TIM_HandleTypeDef *htim, uint32_t frequency_hz)
{
    uint32_t timer_clock = HAL_RCC_GetPCLK1Freq() * 2;  // APB1 timer clock
    uint32_t prescaler = htim->Init.Prescaler + 1;
    uint32_t period = (timer_clock / (prescaler * frequency_hz)) - 1;
    
    __HAL_TIM_SET_AUTORELOAD(htim, period);
}
```

## Advanced Features

### Complementary PWM with Dead Time

For motor control applications:

```c
/* Configure complementary outputs */
TIM_BreakDeadTimeConfigTypeDef sBreakDeadTimeConfig = {0};

sBreakDeadTimeConfig.OffStateRunMode = TIM_OSSR_DISABLE;
sBreakDeadTimeConfig.OffStateIDLEMode = TIM_OSSI_DISABLE;
sBreakDeadTimeConfig.LockLevel = TIM_LOCKLEVEL_OFF;
sBreakDeadTimeConfig.DeadTime = 100;  // Dead time value
sBreakDeadTimeConfig.BreakState = TIM_BREAK_DISABLE;
sBreakDeadTimeConfig.BreakPolarity = TIM_BREAKPOLARITY_HIGH;
sBreakDeadTimeConfig.AutomaticOutput = TIM_AUTOMATICOUTPUT_DISABLE;

HAL_TIMEx_ConfigBreakDeadTime(&htim1, &sBreakDeadTimeConfig);

/* Start complementary PWM */
HAL_TIMEx_PWMN_Start(&htim1, TIM_CHANNEL_1);
```

### Center-Aligned PWM

```c
htim2.Init.CounterMode = TIM_COUNTERMODE_CENTERALIGNED1;
```

### PWM with DMA

For high-frequency updates:

```c
uint32_t pwm_values[] = {100, 200, 300, 400, 500};

HAL_TIM_PWM_Start_DMA(&htim2, TIM_CHANNEL_1, pwm_values, 5);
```

## Verification and Testing

### Oscilloscope Verification

1. Connect probe to PWM output pin
2. Set timebase to show several PWM periods
3. Measure frequency and duty cycle
4. Verify timing accuracy

### LED Dimming Test

```c
/* Breathing LED effect */
for (int i = 0; i <= 100; i++)
{
    set_pwm_duty_cycle(&htim2, TIM_CHANNEL_1, i);
    HAL_Delay(20);
}
for (int i = 100; i >= 0; i--)
{
    set_pwm_duty_cycle(&htim2, TIM_CHANNEL_1, i);
    HAL_Delay(20);
}
```

### Performance Measurements

- Measure PWM jitter with logic analyzer
- Verify frequency accuracy with frequency counter
- Test duty cycle linearity across full range

## Common Issues and Solutions

### PWM Not Starting
- Check timer clock enable
- Verify pin configuration
- Ensure HAL_TIM_PWM_Start() is called

### Incorrect Frequency
- Verify clock configuration
- Check prescaler and period calculations
- Consider APB prescaler effects

### Poor Resolution
- Increase timer frequency (lower prescaler)
- Use higher resolution timer (TIM1 vs TIM2)
- Consider 16-bit vs 32-bit timer limitations

## Applications

### Motor Speed Control
```c
void set_motor_speed(float speed_percent)
{
    // Convert speed percentage to PWM duty cycle
    set_pwm_duty_cycle(&htim2, TIM_CHANNEL_1, speed_percent);
}
```

### Servo Control
```c
void set_servo_angle(float angle_degrees)
{
    // Convert angle to PWM pulse width (1-2ms)
    float pulse_width = 1.0 + (angle_degrees / 180.0);
    float duty_cycle = (pulse_width / 20.0) * 100;  // 20ms period
    set_pwm_duty_cycle(&htim2, TIM_CHANNEL_1, duty_cycle);
}
```

### DAC Simulation
```c
void set_analog_output(float voltage)
{
    // Convert voltage to duty cycle for RC low-pass filter
    float duty_cycle = (voltage / 3.3) * 100;
    set_pwm_duty_cycle(&htim2, TIM_CHANNEL_1, duty_cycle);
}
```

This guide provides a complete foundation for PWM generation on STM32 microcontrollers with practical examples and advanced features.