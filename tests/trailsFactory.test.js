import trailsFactory from "../src/trailsFactory.js"

let subject = [
  {
    name: "Meet1",
    duration: 65
  },
  {
    name: "Meet2",
    duration: 240
  },
  {
    name: "Meet3",
    duration: 120
  },
  {
    name: "Meet4",
    duration: 30
  },
  {
    name: "Meet5",
    duration: 25
  }
]

describe('#build', () => { 
  describe('success', () => {
    let subject = [
      {
        name: "Meet1",
        duration: 65
      },
      {
        name: "Meet2",
        duration: 240
      },
      {
        name: "Meet3",
        duration: 120
      },
      {
        name: "Meet4",
        duration: 30
      },
      {
        name: "Meet5",
        duration: 25
      }
    ]
    it('should return a builded trail', () => {
      const trails = trailsFactory(subject)
      const response = trails.build()
      expect(response).toEqual(expect.arrayContaining([
        {"evening": [{"duration": 240, "name": "Meet2"}], 
         "morning": [{"duration": 65, "name": "Meet1"}, {"duration": 30, "name": "Meet4"}, {"duration": 25, "name": "Meet5"}]}, 
        {"evening": [], 
         "morning": [{"duration": 120, "name": "Meet3"}]}]))
    })
  })
  /*describe('failed', () => {
    let subject = [
      {
        name: "Meet1",
        duration: 74
      },
      {
        name: "Meet2",
        duration: 77.2
      },
      {
        name: "Meet3",
        duration: 457
      }
    ]
    it('should return an error', () => {
      const trails = trailsFactory(subject)
      const response = trails.build()
      
      expect(response).toThrow(Error)
    })
  })*/
})