---
title: Issue 02 - Lots of Research Updates, and Song of the Week!
description: This week I introduce song of the week, and no flying updates sadly.
publishDate: 2025-06-27
image:
  src: /images/osc.jpeg
  alt: Oscilloscope display
---

### Research Updates

For the last week, I've continued to develop my electromagnetically-actuated microbiota sampling capsule. This has involved a mechanism redesign that translates the linear motion of attracting magnets to a rotating moment of a scraping mechanism about a point in the capsule. The challenges encountered are related to micro-manufacturing and often what works in a CAD model does not work in a simulated external environment.

**![Oscilliscope](/images/osc.jpeg)**

Additionally, using the STM32WB55 series microcontroller, I am able to generate precise PWM signals using a general-purpose timer on the microcontroller. This is done using the Hardware Abstraction Layer (HAL) and its appropriate libraries and functions. First, a 1000 ohm potentiometer is divided using a fixed 1000 ohm resistor. This input is fed back into a 12-bit analogue-to-digital converter. When the voltage output over the divider is 0V, the converter reads 2^12, and when the voltage is 1.65V, the converted value is half of this. This was verified experimentally using an oscilloscope. This range of digital values obtained is used to control the duty cycle from 0 to 100% for a 500 Hz square wave.

**![Microcontroller](/images/stm32.jpeg)**

The purpose of this is to allow a controlled DC bias into a force sensor to read force measurements of the opening robotic actuating mechanisms, or to see how much force they can withstand. This signal will be supplied to an op-amp before passing through another analog-to-digital (ADC) converter. This will generate force reading results that can be plotted graphically over time. Our research team will then compare how different micro-mechanical-electrical systems (MEMS) perform and select the best actuator technology.  

### Song of the Week!

This week, the song 'Like a Dream (Demo)' by Chelou is my top pick. I think it is a really nice, simple song that I wish had a full version. It's one that I can enjoy in periods of downtime, and I find it very good to help bring a certain calmness to any work I am doing.

<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/nz/album/like-a-dream-demo/964229339?i=964229512"></iframe>


