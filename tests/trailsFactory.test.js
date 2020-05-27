import trailsFactory from "../src/trailsFactory.js"

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

describe('#buildSchedule', () => {
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
  it('should return a sanitized trail', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    expect(sanitized_trails).toEqual(expect.arrayContaining([["9:00 Meet1 65min", "10:5 Meet4 30min", "10:35 Meet5 25min", "12:00 Almoço", "13:00 Meet2 240min", "17:00 Evento de Networking"], ["9:00 Meet3 120min", "12:00 Almoço", "13:00 Evento de Networking"]]))
  })

  it('should return a lunch time within the array', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()
    
    expect(sanitized_trails[0]).toContain('12:00 Almoço')
    expect(sanitized_trails[1]).toContain('12:00 Almoço')
  })
})