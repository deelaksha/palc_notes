
'use client';

import React, { useEffect } from 'react';

export default function CPointersPage() {
    useEffect(() => {
        const sections: {
          [key: number]: {
            step: number;
            maxSteps: number;
            codeLines: string[];
            memoryElements: HTMLElement[];
            heapElements?: HTMLElement[];
            info: string;
            reset: () => void;
            run: (step: number) => Promise<void>;
          };
        } = {
          1: {
            step: 0,
            maxSteps: 4,
            codeLines: ['line1-1', 'line1-2', 'line1-3', 'line1-4'],
            memoryElements: [],
            info: 'Initially, we create a variable `house_price` on the stack. It has a value of 250,000 and a unique memory address.',
            reset: () => {
              const mem1 = document.getElementById('memory1');
              if (mem1) {
                mem1.innerHTML = `<div class="memory-label">Stack Memory</div><svg class="arrow-svg" id="arrow1"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f08d49" /></marker></defs><line class="arrow-line" /></svg>`;
              }
              sections[1].memoryElements = [];
              sections[1].step = 0;
            },
            run: async (step) => {
              const mem = document.getElementById('memory1');
              const arrow = document.getElementById('arrow1');
              const info = document.getElementById('info1');
              if (!mem || !arrow || !info) return;
              info.innerHTML = '';
              if (step === 1) {
                const block = createVariableBlock('int', 'house_price', '250000', '0x7FFC');
                mem.appendChild(block);
                sections[1].memoryElements.push(block);
                setTimeout(() => (block.style.opacity = '1'), 50);
                info.textContent = 'A new variable `house_price` is allocated on the stack. Its value is 250000.';
              } else if (step === 2) {
                const block = createVariableBlock('int *', 'price_pointer', 'null', '0x7FFD');
                mem.appendChild(block);
                sections[1].memoryElements.push(block);
                setTimeout(() => (block.style.opacity = '1'), 50);
                info.textContent = "A new pointer variable `price_pointer` is created. It doesn't point to anything yet.";
              } else if (step === 3) {
                const varBlock = sections[1].memoryElements[0];
                const ptrBlock = sections[1].memoryElements[1];
                const address = varBlock.getAttribute('data-address');
                const valueSpan = ptrBlock.querySelector('.pointer-value');
                if (valueSpan) valueSpan.textContent = address;
                if (valueSpan?.parentElement) valueSpan.parentElement.classList.add('highlight');
                await delay(500);
                drawArrow(arrow as SVGElement, ptrBlock, varBlock);
                info.textContent = 'The `&` operator gives us the address of `house_price`, which is 0x7FFC. We store this address in `price_pointer`.';
              } else if (step === 4) {
                const varBlock = sections[1].memoryElements[0];
                varBlock.classList.add('highlight');
                info.textContent = 'The `*` operator dereferences the pointer. It uses the address in `price_pointer` to find and access the value in `house_price`.';
              }
            },
          },
          2: {
            step: 0,
            maxSteps: 5,
            codeLines: ['line2-1', 'line2-2', 'line2-3', 'line2-4', 'line2-5'],
            memoryElements: [],
            reset: () => {
              const mem2 = document.getElementById('memory2');
              if (mem2) {
                mem2.innerHTML = `<div class="memory-label">Stack Memory</div><svg class="arrow-svg" id="arrow2"><defs><marker id="arrowhead2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f08d49" /></marker></defs><line class="arrow-line" style="marker-end: url(#arrowhead2);" /></svg>`;
              }
              sections[2].memoryElements = [];
              sections[2].step = 0;
            },
            run: async (step) => {
              const mem = document.getElementById('memory2');
              const arrow = document.getElementById('arrow2');
              const info = document.getElementById('info2');
              if (!mem || !arrow || !info) return;
              info.innerHTML = '';
              if (step === 1) {
                const arrBlock = createArrayBlock('int', 'street_numbers', ['10', '20', '30'], ['0x2000', '0x2004', '0x2008']);
                mem.appendChild(arrBlock);
                sections[2].memoryElements.push(arrBlock);
                setTimeout(() => (arrBlock.style.opacity = '1'), 50);
                info.textContent = 'An array is a contiguous block of memory. The name `street_numbers` points to the first element.';
              } else if (step === 2) {
                const arrBlock = sections[2].memoryElements[0];
                const ptrBlock = createVariableBlock('int *', 'current_house', '0x2000', '0x2010');
                mem.appendChild(ptrBlock);
                sections[2].memoryElements.push(ptrBlock);
                setTimeout(() => (ptrBlock.style.opacity = '1'), 50);
                await delay(500);
                if (arrBlock) {
                  drawArrow(arrow as SVGElement, ptrBlock, arrBlock.querySelector('.element-0') as HTMLElement);
                }
                info.textContent = 'We create a pointer `current_house` and point it to the first element of the array.';
              } else if (step === 3) {
                info.textContent = 'Dereferencing `current_house` gives us the value of the first element, which is 10.';
                sections[2].memoryElements[0].querySelector('.element-0')?.classList.add('highlight');
              } else if (step === 4) {
                const ptrBlock = sections[2].memoryElements[1];
                const valueSpan = ptrBlock.querySelector('.pointer-value');
                if (valueSpan) valueSpan.textContent = '0x2004';
                ptrBlock.classList.add('highlight');
                drawArrow(arrow as SVGElement, ptrBlock, sections[2].memoryElements[0].querySelector('.element-1') as HTMLElement);
                info.textContent = 'Using `current_house++` advances the pointer by `sizeof(int)` bytes, moving it to the next element.';
              } else if (step === 5) {
                info.textContent = 'Now, dereferencing `current_house` gives us the value of the second element, which is 20.';
                sections[2].memoryElements[0].querySelector('.element-1')?.classList.add('highlight');
              }
            },
          },
          3: {
            step: 0,
            maxSteps: 4,
            codeLines: ['line3-1', 'line3-2', 'line3-3', 'line3-4'],
            memoryElements: [],
            reset: () => {
              const mem3 = document.getElementById('memory3');
              if (mem3) {
                mem3.innerHTML = `<div class="memory-label">Stack Memory</div><svg class="arrow-svg" id="arrow3-1"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg><svg class="arrow-svg" id="arrow3-2"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg>`;
              }
              sections[3].memoryElements = [];
              sections[3].step = 0;
            },
            run: async (step) => {
              const mem = document.getElementById('memory3');
              const arrow1 = document.getElementById('arrow3-1');
              const arrow2 = document.getElementById('arrow3-2');
              const info = document.getElementById('info3');
              if (!mem || !arrow1 || !arrow2 || !info) return;
              info.innerHTML = '';
              if (step === 1) {
                const block = createVariableBlock('int', 'value', '99', '0x3001');
                mem.appendChild(block);
                sections[3].memoryElements.push(block);
                setTimeout(() => (block.style.opacity = '1'), 50);
                info.textContent = 'A simple integer variable `value` is created.';
              } else if (step === 2) {
                const ptr1Block = createVariableBlock('int *', 'p1', '0x3001', '0x3005');
                mem.appendChild(ptr1Block);
                sections[3].memoryElements.push(ptr1Block);
                setTimeout(() => (ptr1Block.style.opacity = '1'), 50);
                await delay(500);
                drawArrow(arrow1 as SVGElement, ptr1Block, sections[3].memoryElements[0]);
                info.textContent = '`p1` is a pointer to an integer. It stores the address of `value`.';
              } else if (step === 3) {
                const ptr2Block = createVariableBlock('int **', 'p2', '0x3005', '0x3009');
                mem.appendChild(ptr2Block);
                sections[3].memoryElements.push(ptr2Block);
                setTimeout(() => (ptr2Block.style.opacity = '1'), 50);
                await delay(500);
                drawArrow(arrow2 as SVGElement, ptr2Block, sections[3].memoryElements[1]);
                info.textContent = '`p2` is a pointer to a pointer. It stores the address of `p1`.';
              } else if (step === 4) {
                info.textContent = 'Using `**p2` requires two dereferences. First we follow `p2` to `p1`, then we follow `p1` to `value`.';
                sections[3].memoryElements[0].classList.add('highlight');
              }
            },
          },
          4: {
            step: 0,
            maxSteps: 5,
            codeLines: ['line4-1', 'line4-2', 'line4-3', 'line4-4', 'line4-5'],
            memoryElements: [],
            heapElements: [],
            reset: () => {
              const mem4 = document.getElementById('memory4');
              if (mem4) {
                mem4.innerHTML = `<div class="memory-label" style="top: 1rem; left: 1rem;">Stack</div><div class="memory-label" style="top: 1rem; right: 1rem; color: #44b9d0;">Heap</div><svg class="arrow-svg" id="arrow4"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg>`;
              }
              sections[4].memoryElements = [];
              if (sections[4].heapElements) sections[4].heapElements = [];
              sections[4].step = 0;
            },
            run: async (step) => {
              const mem = document.getElementById('memory4');
              const arrow = document.getElementById('arrow4');
              const info = document.getElementById('info4');
              if (!mem || !arrow || !info) return;
              info.innerHTML = '';
              if (step === 1) {
                const block = createVariableBlock('int *', 'lot', 'null', '0x4001');
                mem.appendChild(block);
                sections[4].memoryElements.push(block);
                setTimeout(() => (block.style.opacity = '1'), 50);
                info.textContent = 'On the stack, we create a pointer named `lot` that will hold the address of our new memory block.';
              } else if (step === 2) {
                const heapBlock = createVariableBlock('int', 'Heap Data', '???', '0x5001');
                heapBlock.style.backgroundColor = '#1d354b';
                heapBlock.style.borderColor = '#44b9d0';
                mem.appendChild(heapBlock);
                sections[4].heapElements!.push(heapBlock);
                setTimeout(() => (heapBlock.style.opacity = '1'), 50);
                await delay(500);
                const ptrBlock = sections[4].memoryElements[0];
                ptrBlock.querySelector('.pointer-value')!.textContent = '0x5001';
                drawArrow(arrow as SVGElement, ptrBlock, heapBlock);
                info.textContent = '`malloc()` requests a block of memory from the heap. The address of this block (0x5001) is stored in our `lot` pointer.';
              } else if (step === 3) {
                const heapBlock = sections[4].heapElements![0];
                heapBlock.querySelector('.value')!.textContent = '50';
                heapBlock.classList.add('highlight');
                info.textContent = 'We use the pointer `lot` to access the heap memory and store the value `50` inside it.';
              } else if (step === 4) {
                const heapBlock = sections[4].heapElements![0];
                info.textContent = 'The value is retrieved from the heap memory, and printed to the console.';
                heapBlock.classList.add('highlight');
              } else if (step === 5) {
                const heapBlock = sections[4].heapElements![0];
                heapBlock.style.backgroundColor = '#4b0000';
                heapBlock.style.borderColor = '#8b0000';
                heapBlock.querySelector('.value')!.textContent = 'FREED';
                heapBlock.classList.remove('highlight');
                info.textContent = '`free()` deallocates the heap memory, but the pointer still holds the old address. It is now a **dangling pointer**!';
              }
            },
          },
          5: {
            step: 0,
            maxSteps: 5,
            codeLines: ['line5-1', 'line5-2', 'line5-3', 'line5-4', 'line5-5'],
            memoryElements: [],
            reset: () => {
              const mem5 = document.getElementById('memory5');
              if (mem5) {
                mem5.innerHTML = `<div class="memory-label">Stack Memory</div><svg class="arrow-svg" id="arrow5"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg>`;
              }
              sections[5].memoryElements = [];
              sections[5].step = 0;
            },
            run: async (step) => {
              const mem = document.getElementById('memory5');
              const arrow = document.getElementById('arrow5');
              const info = document.getElementById('info5');
              if (!mem || !arrow || !info) return;
              info.innerHTML = '';
              if (step === 1) {
                info.textContent = 'First, we define a new data type called `struct Apartment` which is a blueprint for our apartment building. It contains rooms for `rent` and `tenant`.';
              } else if (step === 2) {
                const structBlock = createStructBlock('Apartment', 'apt', { rent: 1200, tenant: 'Alice' }, '0x9000');
                mem.appendChild(structBlock);
                sections[5].memoryElements.push(structBlock);
                setTimeout(() => (structBlock.style.opacity = '1'), 50);
                info.textContent = 'We create a variable `apt` of our new `Apartment` type on the stack, complete with its values.';
              } else if (step === 3) {
                const aptBlock = sections[5].memoryElements[0];
                const ptrBlock = createVariableBlock('Apartment *', 'apt_ptr', '0x9000', '0x9020');
                mem.appendChild(ptrBlock);
                sections[5].memoryElements.push(ptrBlock);
                setTimeout(() => (ptrBlock.style.opacity = '1'), 50);
                await delay(500);
                drawArrow(arrow as SVGElement, ptrBlock, aptBlock);
                info.textContent = 'We create a pointer `apt_ptr` and make it point to the entire `apt` struct.';
              } else if (step === 4) {
                const aptBlock = sections[5].memoryElements[0];
                aptBlock.querySelector('.member-rent')?.classList.add('highlight');
                info.textContent = 'The `->` operator is used to access a member of the struct directly through the pointer. This is a shorthand for `(*apt_ptr).rent`.';
              } else if (step === 5) {
                const aptBlock = sections[5].memoryElements[0];
                aptBlock.querySelector('.member-tenant')?.classList.add('highlight');
                info.textContent = 'We can also use the dereference operator `*` to access the struct first, and then the `.` operator to access its members.';
              }
            },
          },
          6: {
            step: 0,
            maxSteps: 5,
            codeLines: ['line6-1', 'line6-2', 'line6-3', 'line6-4', 'line6-5'],
            memoryElements: [],
            reset: () => {
              const mem6 = document.getElementById('memory6');
              if (mem6) {
                mem6.innerHTML = `<div class="memory-label">Stack Memory</div><svg class="arrow-svg" id="arrow6-1"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg><svg class="arrow-svg" id="arrow6-2"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg><svg class="arrow-svg" id="arrow6-3"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg>`;
              }
              sections[6].memoryElements = [];
              sections[6].step = 0;
            },
            run: async (step) => {
              const mem = document.getElementById('memory6');
              const arrow1 = document.getElementById('arrow6-1');
              const arrow2 = document.getElementById('arrow6-2');
              const arrow3 = document.getElementById('arrow6-3');
              const info = document.getElementById('info6');
              if (!mem || !arrow1 || !arrow2 || !arrow3 || !info) return;
              info.innerHTML = '';
              if (step === 1) {
                const block = createVariableBlock('int', 'x', '100', '0x1000');
                mem.appendChild(block);
                sections[6].memoryElements.push(block);
                setTimeout(() => (block.style.opacity = '1'), 50);
                info.textContent = 'We start with a simple integer `x`.';
              } else if (step === 2) {
                const ptr1Block = createVariableBlock('int *', 'p1', '0x1000', '0x1004');
                mem.appendChild(ptr1Block);
                sections[6].memoryElements.push(ptr1Block);
                setTimeout(() => (ptr1Block.style.opacity = '1'), 50);
                await delay(500);
                drawArrow(arrow1 as SVGElement, ptr1Block, sections[6].memoryElements[0]);
                info.textContent = '`p1` points to `x`. It stores the address of `x`.';
              } else if (step === 3) {
                const ptr2Block = createVariableBlock('int **', 'p2', '0x1004', '0x1008');
                mem.appendChild(ptr2Block);
                sections[6].memoryElements.push(ptr2Block);
                setTimeout(() => (ptr2Block.style.opacity = '1'), 50);
                await delay(500);
                drawArrow(arrow2 as SVGElement, ptr2Block, sections[6].memoryElements[1]);
                info.textContent = '`p2` points to `p1`. It stores the address of `p1`.';
              } else if (step === 4) {
                const ptr3Block = createVariableBlock('int ***', 'p3', '0x1008', '0x1012');
                mem.appendChild(ptr3Block);
                sections[6].memoryElements.push(ptr3Block);
                setTimeout(() => (ptr3Block.style.opacity = '1'), 50);
                await delay(500);
                drawArrow(arrow3 as SVGElement, ptr3Block, sections[6].memoryElements[2]);
                info.textContent = '`p3` points to `p2`. It stores the address of `p2`.';
              } else if (step === 5) {
                info.textContent = 'Using `***p3` requires three dereferences to get to the final value.';
                sections[6].memoryElements[0].classList.add('highlight');
              }
            },
          },
        7: {
            step: 0,
            maxSteps: 5,
            codeLines: ['line7-1', 'line7-2', 'line7-3', 'line7-4', 'line7-5'],
            memoryElements: [],
            reset: () => {
                const mem = document.getElementById('memory7');
                if(mem) mem.innerHTML = `<div class="memory-label" style="top: 1rem; left: 1rem; color: #78a2e4;">Code Segment</div><div class="memory-label" style="top: 1rem; right: 1rem;">Stack Memory</div><svg class="arrow-svg" id="arrow7-1"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg>`;
                sections[7].memoryElements = [];
                sections[7].step = 0;
            },
            run: async (step) => {
                const mem = document.getElementById('memory7');
                const arrow = document.getElementById('arrow7-1');
                const info = document.getElementById('info7');
                if (!mem || !arrow || !info) return;
                info.innerHTML = '';
                if (step === 1) {
                    const fn1Block = createFunctionBlock('int add(int, int)', '0x8000');
                    mem.appendChild(fn1Block);
                    sections[7].memoryElements.push(fn1Block);
                    setTimeout(() => fn1Block.style.opacity = '1', 50);
                    info.textContent = 'Functions reside in the **Code Segment** of memory. The `add` function is at a specific address.';
                } else if (step === 2) {
                    const fn2Block = createFunctionBlock('int sub(int, int)', '0x8020');
                    mem.appendChild(fn2Block);
                    sections[7].memoryElements.push(fn2Block);
                    setTimeout(() => fn2Block.style.opacity = '1', 50);
                    info.textContent = 'The `subtract` function is also in the Code Segment at its own unique address.';
                } else if (step === 3) {
                    const ptrBlock = createVariableBlock('int (*)(int, int)', 'math_op', 'null', '0x8050');
                    mem.appendChild(ptrBlock);
                    sections[7].memoryElements.push(ptrBlock);
                    setTimeout(() => ptrBlock.style.opacity = '1', 50);
                    info.textContent = 'We create a function pointer `math_op`. Its type signature must match the function it will point to.';
                } else if (step === 4) {
                    const fn1Block = sections[7].memoryElements[0];
                    const ptrBlock = sections[7].memoryElements[2];
                    ptrBlock.querySelector('.pointer-value')!.textContent = '0x8000';
                    await delay(500);
                    drawArrow(arrow as SVGElement, ptrBlock, fn1Block);
                    info.textContent = 'We assign the address of the `add` function to `math_op`. Now `math_op` points to `add`.';
                } else if (step === 5) {
                    const fn1Block = sections[7].memoryElements[0];
                    fn1Block.classList.add('highlight');
                    info.textContent = 'We can now call the `add` function indirectly through the `math_op` pointer.';
                }
            }
        },
        8: {
            step: 0,
            maxSteps: 4,
            codeLines: ['line8-1', 'line8-2', 'line8-3', 'line8-4', 'line8-5'],
            memoryElements: [],
            reset: () => {
                const mem = document.getElementById('memory8');
                if(mem) mem.innerHTML = `<div class="memory-label">Stack Memory</div><svg class="arrow-svg" id="arrow8"><line class="arrow-line" style="marker-end: url(#arrowhead);" /></svg>`;
                sections[8].memoryElements = [];
                sections[8].step = 0;
            },
            run: async (step) => {
                const mem = document.getElementById('memory8');
                const arrow = document.getElementById('arrow8');
                const info = document.getElementById('info8');
                 if (!mem || !arrow || !info) return;
                info.innerHTML = '';
                if (step === 1) {
                    const intBlock = createVariableBlock('int', 'number', '10', '0x4000');
                    mem.appendChild(intBlock);
                    sections[8].memoryElements.push(intBlock);
                    setTimeout(() => intBlock.style.opacity = '1', 50);
                    info.textContent = 'An integer `number` is created.';
                } else if (step === 2) {
                    const charBlock = createVariableBlock('char', 'character', '\'A\'', '0x4004');
                    mem.appendChild(charBlock);
                    sections[8].memoryElements.push(charBlock);
                    setTimeout(() => charBlock.style.opacity = '1', 50);
                    info.textContent = 'A character `character` is created. It has a different size in memory than an integer.';
                } else if (step === 3) {
                    const voidPtrBlock = createVariableBlock('void *', 'generic_ptr', 'null', '0x4008');
                    mem.appendChild(voidPtrBlock);
                    sections[8].memoryElements.push(voidPtrBlock);
                    setTimeout(() => voidPtrBlock.style.opacity = '1', 50);
                    info.textContent = 'A `void` pointer `generic_ptr` is declared. It can hold any address, but it doesn\'t know the type of data at that address.';
                } else if (step === 4) {
                    const intBlock = sections[8].memoryElements[0];
                    const voidPtrBlock = sections[8].memoryElements[2];
                    voidPtrBlock.querySelector('.pointer-value')!.textContent = '0x4000';
                    await delay(500);
                    drawArrow(arrow as SVGElement, voidPtrBlock, intBlock);
                    info.textContent = 'We assign the address of `number` to `generic_ptr`. This is perfectly valid.';
                }
            }
        }
        };
    
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    
        function createVariableBlock(type: string, name: string, value: string, address: string) {
          const block = document.createElement('div');
          block.className = 'variable-block flex flex-col items-center justify-center';
          const valueSpan = type.includes('*') ? `<span class="value pointer-value">${value}</span>` : `<span class="value">${value}</span>`;
          block.innerHTML = `
            <div class="variable-name text-sm font-bold">${name}</div>
            <div class="variable-type text-xs text-gray-400">${type}</div>
            ${valueSpan}
            <div class="address text-xs">@ ${address}</div>
          `;
          block.setAttribute('data-address', address);
          block.setAttribute('data-name', name);
          return block;
        }
    
        function createArrayBlock(type: string, name: string, values: string[], addresses: string[]) {
          const block = document.createElement('div');
          block.className = 'variable-block bg-[#1a252d] border-[#44b9d0] flex flex-col items-center';
          const valueHTML = values
            .map(
              (val, idx) => `
            <div class="element-${idx} flex items-center justify-center gap-2 p-2 w-full border-t border-t-[#30363d] first:border-t-0">
                <span class="value text-lg font-bold">${val}</span>
                <span class="address text-xs text-gray-400">@ ${addresses[idx]}</span>
            </div>
          `
            )
            .join('');
    
          block.innerHTML = `
            <div class="variable-name text-sm font-bold">${name}</div>
            <div class="variable-type text-xs text-gray-400">Array of ${type}s</div>
            <div class="mt-2 w-full text-left">${valueHTML}</div>
          `;
          block.setAttribute('data-address', addresses[0]);
          block.setAttribute('data-name', name);
          return block;
        }
    
        function createStructBlock(type: string, name: string, members: { [key: string]: string | number }, address: string) {
          const block = document.createElement('div');
          block.className = 'variable-block bg-[#1a252d] border-[#44b9d0] flex flex-col items-center';
          let membersHTML = '';
          for (const key in members) {
            const value = members[key];
            const valueSpan = typeof value === 'string' ? `"${value}"` : value;
            membersHTML += `
              <div class="member-${key} flex justify-between w-full p-1 border-t border-t-[#30363d] first:border-t-0">
                  <span class="text-sm text-[#79c0ff]">${key}:</span>
                  <span class="value text-md font-bold">${valueSpan}</span>
              </div>
            `;
          }
          block.innerHTML = `
            <div class="variable-name text-sm font-bold">${name}</div>
            <div class="variable-type text-xs text-gray-400">struct ${type}</div>
            <div class="mt-2 w-full">${membersHTML}</div>
            <div class="address text-xs">@ ${address}</div>
          `;
          block.setAttribute('data-address', address);
          return block;
        }

        function createFunctionBlock(name: string, address: string) {
            const block = document.createElement('div');
            block.className = 'variable-block flex flex-col items-center justify-center';
            block.style.backgroundColor = '#1e252d';
            block.style.borderColor = '#78a2e4';
            block.innerHTML = `
                <div class="variable-name text-sm font-bold">${name}</div>
                <div class="variable-type text-xs text-gray-400">function</div>
                <div class="address text-xs mt-2">@ ${address}</div>
            `;
            block.setAttribute('data-address', address);
            block.setAttribute('data-name', name);
            return block;
        }
    
        function drawArrow(svg: SVGElement, fromElement: HTMLElement, toElement: HTMLElement) {
          const svgRect = svg.getBoundingClientRect();
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();
          const line = svg.querySelector('.arrow-line') as SVGLineElement;
          if (!line) return;
    
          const startX = fromRect.left + fromRect.width / 2 - svgRect.left;
          const startY = fromRect.top + fromRect.height / 2 - svgRect.top;
          const endX = toRect.left + toRect.width / 2 - svgRect.left;
          const endY = toRect.top + toRect.height / 2 - svgRect.top;
    
          line.setAttribute('x1', String(startX));
          line.setAttribute('y1', String(startY));
          line.setAttribute('x2', String(startX));
          line.setAttribute('y2', String(startY));
    
          line.style.strokeDashoffset = '1000';
          line.style.transition = 'stroke-dashoffset 1s ease-in-out';
    
          setTimeout(() => {
            line.setAttribute('x2', String(endX));
            line.setAttribute('y2', String(endY));
            line.style.strokeDashoffset = '0';
          }, 50);
        }
    
        async function stepAnimation(sectionId: number) {
          const section = sections[sectionId];
          if (section.step < section.maxSteps) {
            section.step++;
            document.querySelectorAll<HTMLElement>(`#code${sectionId} div`).forEach((div) => div.classList.remove('current-line'));
            const lineEl = document.getElementById(section.codeLines[section.step - 1]);
            if(lineEl) lineEl.classList.add('current-line');
            await section.run(section.step);
          }
        }
    
        function resetAnimation(sectionId: number) {
          sections[sectionId].reset();
          document.querySelectorAll<HTMLElement>(`#code${sectionId} div`).forEach((div) => div.classList.remove('current-line'));
        }
    
        (window as any).stepAnimation = stepAnimation;
        (window as any).resetAnimation = resetAnimation;
    
        return () => {
          delete (window as any).stepAnimation;
          delete (window as any).resetAnimation;
        };
      }, []);

  return (
    <>
      <style jsx global>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: #161b22;
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 2px solid #21262d;
        }
        .section {
            border-bottom: 2px dashed #21262d;
            padding-bottom: 3rem;
            margin-bottom: 3rem;
        }
        .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .code-block {
            background-color: #010409;
            color: #79c0ff;
            font-family: monospace;
            padding: 1.5rem;
            border-radius: 1rem;
            white-space: pre-wrap;
            overflow-x: auto;
            font-size: 1rem;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
            line-height: 1.5;
        }
        .memory-container {
            position: relative;
            background-color: #0e1215;
            border: 1px solid #30363d;
            border-radius: 1rem;
            padding: 3rem;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 2rem;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }
        .memory-label {
            position: absolute;
            top: 1rem;
            left: 1rem;
            font-size: 1.25rem;
            font-weight: bold;
            color: #8b949e;
        }
        .variable-block {
            background-color: #0e1a25;
            border: 2px solid #58a6ff;
            border-radius: 0.75rem;
            padding: 1rem;
            text-align: center;
            position: relative;
            transition: all 0.7s ease-in-out;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            min-width: 120px;
            opacity: 0;
            transform: translateY(20px);
        }
        .variable-block.highlight {
            animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 15px #f7e01b;
            border-color: #f7e01b;
          }
          50% {
            box-shadow: 0 0 25px #f7e01b;
          }
          100% {
            box-shadow: 0 0 15px #f7e01b;
            border-color: #f7e01b;
          }
        }
        .variable-name,
        .variable-type {
            font-weight: bold;
            color: #c9d1d9;
        }
        .address {
            font-size: 0.75rem;
            color: #8b949e;
            margin-top: 0.5rem;
        }
        .value {
            font-size: 1.5rem;
            color: #58a6ff;
            font-weight: bold;
        }
        .pointer-value {
            color: #f08d49;
        }
        .current-line {
            background-color: rgba(251, 191, 36, 0.3);
            padding: 0 0.5rem;
            border-radius: 0.25rem;
        }
        .button-group {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .next-button,
        .reset-button {
            padding: 0.75rem 2rem;
            font-weight: bold;
            border-radius: 2rem;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }
        .next-button {
            background-color: #58a6ff;
            color: #0d1117;
            box-shadow: 0 4px 15px rgba(88, 166, 255, 0.4);
        }
        .next-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(88, 166, 255, 0.6);
        }
        .reset-button {
            background-color: #21262d;
            color: #c9d1d9;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        .arrow-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: visible;
        }
        .arrow-line {
            stroke: #f08d49;
            stroke-width: 4;
            fill: none;
            marker-end: url(#arrowhead);
            transition: all 1s ease-in-out;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
        }
        .dot {
            fill: #f08d49;
            transition: all 1s ease-in-out;
            opacity: 0;
        }
        .info-box {
            background-color: #1e252d;
            border: 1px solid #30363d;
            border-radius: 0.75rem;
            padding: 1rem;
            margin-top: 1rem;
            font-size: 0.9rem;
            line-height: 1.4;
            color: #8b949e;
        }
      `}</style>
      <div className="container">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-[#79c0ff]">The Memory City: An Interactive Pointer Guide</h1>
        <p className="text-center text-gray-400 text-lg mb-8">
            Welcome, future master of C pointers. Here, we'll explore how pointers work in memory. Click "Next Step" to watch the code execute and see the magic happen!
        </p>

        {/* Section 1: The Basics - The Stack District */}
        <div id="section1" className="section">
            <h2 className="text-3xl font-bold mb-4">1. The Stack District: Pointers to Variables</h2>
            <p className="text-gray-400 mb-4">
                Imagine the stack as a bustling district where variables live in their own homes. A <strong>pointer</strong> is a special signpost that stores the address of a house, not the house itself. The `&` operator finds the address, and the `*` operator uses the signpost to find the value inside the house.
            </p>
            <div className="code-block" id="code1">
                <div id="line1-1">int house_price = 250000;</div>
                <div id="line1-2">int *price_pointer;</div>
                <div id="line1-3">price_pointer = &house_price;</div>
                <div id="line1-4">printf("The house price is: %d\n", *price_pointer);</div>
            </div>
            <div className="memory-container mt-8" id="memory1">
                <div className="memory-label">Stack Memory</div>
                <svg className="arrow-svg" id="arrow1">
                    <defs>
                        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f08d49" />
                        </marker>
                    </defs>
                    <line className="arrow-line" />
                </svg>
            </div>
            <div className="info-box mt-4" id="info1"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(1)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(1)}>Reset</button>
            </div>
        </div>

        {/* Section 2: Pointers and Arrays - The Block Party */}
        <div id="section2" className="section">
            <h2 className="text-3xl font-bold mb-4">2. The Block Party: Pointers and Arrays</h2>
            <p className="text-gray-400 mb-4">
                An array is like a row of identical houses. The name of the array itself is a pointer to the first house in the row. This allows us to use <strong>pointer arithmetic</strong> to move from one house to the next.
            </p>
            <div className="code-block" id="code2">
                <div id="line2-1">int street_numbers[] = &#123;10, 20, 30&#125;;</div>
                <div id="line2-2">int *current_house = street_numbers;</div>
                <div id="line2-3">printf("First number: %d\n", *current_house);</div>
                <div id="line2-4">current_house++; // Move to the next house</div>
                <div id="line2-5">printf("Second number: %d\n", *current_house);</div>
            </div>
            <div className="memory-container mt-8" id="memory2">
                <div className="memory-label">Stack Memory</div>
                <svg className="arrow-svg" id="arrow2">
                    <defs><marker id="arrowhead2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f08d49" /></marker></defs>
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead2)"}} />
                </svg>
            </div>
            <div className="info-box mt-4" id="info2"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(2)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(2)}>Reset</button>
            </div>
        </div>

        {/* Section 3: Pointers to Pointers - The Locked Box */}
        <div id="section3" className="section">
            <h2 className="text-3xl font-bold mb-4">3. The Locked Box: Pointers to Pointers</h2>
            <p className="text-gray-400 mb-4">
                This is a pointer that points to another pointer. Think of it as a locked box holding a key. You have to open the first box (`**p2`) to get the key (`*p1`), and then use that key to get to the final destination (`value`).
            </p>
            <div className="code-block" id="code3">
                <div id="line3-1">int value = 99;</div>
                <div id="line3-2">int *p1 = &value;</div>
                <div id="line3-3">int **p2 = &p1;</div>
                <div id="line3-4">printf("Value is %d", **p2);</div>
            </div>
            <div className="memory-container mt-8" id="memory3">
                <div className="memory-label">Stack Memory</div>
                <svg className="arrow-svg" id="arrow3-1">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
                <svg className="arrow-svg" id="arrow3-2">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
            </div>
            <div className="info-box mt-4" id="info3"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(3)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(3)}>Reset</button>
            </div>
        </div>

        {/* Section 4: Dynamic Memory - The Empty Lot */}
        <div id="section4" className="section">
            <h2 className="text-3xl font-bold mb-4">4. The Empty Lot: Dynamic Memory (`malloc`/`free`)</h2>
            <p className="text-gray-400 mb-4">
                The <strong>heap</strong> is a large, empty lot where you can request space for variables on the fly. `malloc()` is like asking for a new lot, and `free()` is like returning it.
            </p>
            <div className="code-block" id="code4">
                <div id="line4-1">int *lot;</div>
                <div id="line4-2">lot = (int*)malloc(sizeof(int));</div>
                <div id="line4-3">*lot = 50;</div>
                <div id="line4-4">printf("Value in lot: %d\n", *lot);</div>
                <div id="line4-5">free(lot);</div>
            </div>
            <div className="memory-container mt-8" id="memory4">
                <div className="memory-label" style={{top: "1rem", left: "1rem"}}>Stack</div>
                <div className="memory-label" style={{top: "1rem", right: "1rem", color: "#44b9d0"}}>Heap</div>
                <svg className="arrow-svg" id="arrow4">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
            </div>
            <div className="info-box mt-4" id="info4"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(4)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(4)}>Reset</button>
            </div>
        </div>
        
        {/* Section 5: Pointers and Structs - The Apartment Building */}
        <div id="section5" className="section">
            <h2 className="text-3xl font-bold mb-4">5. The Apartment Building: Pointers to Structs</h2>
            <p className="text-gray-400 mb-4">
                A <strong>struct</strong> is like an apartment building with different rooms (members). A pointer can be used to point to the entire building. The `->` operator is a shortcut to directly access a specific room inside.
            </p>
            <div className="code-block" id="code5">
                <div id="line5-1">struct Apartment &#123; int rent; char *tenant; &#125;;</div>
                <div id="line5-2">struct Apartment apt = &#123;1200, "Alice"&#125;;</div>
                <div id="line5-3">struct Apartment *apt_ptr = &apt;</div>
                <div id="line5-4">printf("Rent is: %d\n", apt_ptr->rent);</div>
                <div id="line5-5">printf("Tenant is: %s\n", (*apt_ptr).tenant);</div>
            </div>
            <div className="memory-container mt-8" id="memory5">
                <div className="memory-label">Stack Memory</div>
                <svg className="arrow-svg" id="arrow5">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
            </div>
            <div className="info-box mt-4" id="info5"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(5)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(5)}>Reset</button>
            </div>
        </div>

        {/* Section 6: Pointers to Pointers to Pointers - The Multi-Level Map */}
        <div id="section6" className="section">
            <h2 className="text-3xl font-bold mb-4">6. The Multi-Level Map: Triple Pointers</h2>
            <p className="text-gray-400 mb-4">
                This is as advanced as it gets. A <strong>triple pointer</strong> is a map that points to another map, which in turn points to a map that points to a final destination. Each `*` operator peels back a layer.
            </p>
            <div className="code-block" id="code6">
                <div id="line6-1">int x = 100;</div>
                <div id="line6-2">int *p1 = &x;</div>
                <div id="line6-3">int **p2 = &p1;</div>
                <div id="line6-4">int ***p3 = &p2;</div>
                <div id="line6-5">printf("Value is %d", ***p3);</div>
            </div>
            <div className="memory-container mt-8" id="memory6">
                <div className="memory-label">Stack Memory</div>
                <svg className="arrow-svg" id="arrow6-1">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
                <svg className="arrow-svg" id="arrow6-2">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
                <svg className="arrow-svg" id="arrow6-3">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
            </div>
            <div className="info-box mt-4" id="info6"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(6)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(6)}>Reset</button>
            </div>
        </div>

        {/* Section 7: Function Pointers - The Job Board */}
        <div id="section7" className="section">
            <h2 className="text-3xl font-bold mb-4">7. The Job Board: Pointers to Functions</h2>
            <p className="text-gray-400 mb-4">
                Pointers aren't just for data; they can also point to functions. This is like a job board that lists the addresses of different tasks. We can use a <strong>function pointer</strong> to call the correct function without knowing its name in advance.
            </p>
            <div className="code-block" id="code7">
                <div id="line7-1">int add(int a, int b) &#123; return a + b; &#125;</div>
                <div id="line7-2">int subtract(int a, int b) &#123; return a - b; &#125;</div>
                <div id="line7-3">int (*math_op)(int, int);</div>
                <div id="line7-4">math_op = add;</div>
                <div id="line7-5">int result1 = math_op(5, 3);</div>
                <div id="line7-6">math_op = subtract;</div>
                <div id="line7-7">int result2 = math_op(10, 4);</div>
            </div>
            <div className="memory-container mt-8" id="memory7">
                <div className="memory-label" style={{top: "1rem", left: "1rem", color: "#78a2e4"}}>Code Segment</div>
                <div className="memory-label" style={{top: "1rem", right: "1rem"}}>Stack Memory</div>
                <svg className="arrow-svg" id="arrow7-1">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
            </div>
            <div className="info-box mt-4" id="info7"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(7)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(7)}>Reset</button>
            </div>
        </div>
        
        {/* Section 8: Void Pointers - The Generic Key */}
        <div id="section8" className="section">
            <h2 className="text-3xl font-bold mb-4">8. The Generic Key: `void` Pointers</h2>
            <p className="text-gray-400 mb-4">
                A <strong>`void` pointer</strong> is a generic pointer that can hold the address of *any* data type. It's like a key that fits any lock, but to use it, you first have to know what kind of lock it is and use a typecast to unlock it.
            </p>
            <div className="code-block" id="code8">
                <div id="line8-1">int number = 10;</div>
                <div id="line8-2">char character = 'A';</div>
                <div id="line8-3">void *generic_ptr;</div>
                <div id="line8-4">generic_ptr = &number;</div>
                <div id="line8-5">printf("Number: %d\n", *(int*)generic_ptr);</div>
                <div id="line8-6">generic_ptr = &character;</div>
                <div id="line8-7">printf("Character: %c\n", *(char*)generic_ptr);</div>
            </div>
            <div className="memory-container mt-8" id="memory8">
                <div className="memory-label">Stack Memory</div>
                <svg className="arrow-svg" id="arrow8">
                    <line className="arrow-line" style={{markerEnd: "url(#arrowhead)"}} />
                </svg>
            </div>
            <div className="info-box mt-4" id="info8"></div>
            <div className="button-group">
                <button className="next-button" onClick={() => (window as any).stepAnimation(8)}>Next Step</button>
                <button className="reset-button" onClick={() => (window as any).resetAnimation(8)}>Reset</button>
            </div>
        </div>

      </div>
    </>
  );
}
