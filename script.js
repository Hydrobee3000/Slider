let slider = document.getElementById('slider')
let sliderItems = document.getElementById('slides')
let prev = document.getElementById('prev')
let next = document.getElementById('next')
let dots = document.querySelectorAll('.dot')

const slide = (wrapper, items, prev, next) => {
  let slides = items.getElementsByClassName('slide'),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true

  // for shifting on the new cycle
  items.appendChild(cloneFirst) //add a node to the end
  items.insertBefore(cloneLast, firstSlide) //insert the cloneLast into before firstSlide
  wrapper.classList.add('loaded')

  const checkIndex = () => {
    items.classList.remove('shifting')

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + 'px'
      index = slidesLength - 1
    }
    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + 'px'
      index = 0
    }
    allowShift = true
  }

  prev.addEventListener('click', () => {
    shiftSlide(-1)
  })
  next.addEventListener('click', () => {
    shiftSlide(1)
  })

  const shiftSlide = (dir, action) => {
    items.classList.add('shifting')

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft
      }
      if (dir == 1) {
        items.style.left = posInitial - slideSize + 'px'
        index++
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + 'px'
        index--
      }
    }
    allowShift = false
  }

  items.addEventListener('transitionend', checkIndex)
}

slide(slider, sliderItems, prev, next)
