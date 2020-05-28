import trailsFactory from "../src/trailsFactory.js"

describe('#build', () => { 
  describe('success', () => {
    it('should return a builded trail', () => {
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
      const trails = trailsFactory(subject)
      const response = trails.build()
      expect(response).toEqual(expect.arrayContaining([
        {"evening": [{"duration": 240, "name": "Meet2"}], 
         "morning": [{"duration": 65, "name": "Meet1"}, {"duration": 30, "name": "Meet4"}, {"duration": 25, "name": "Meet5"}]}, 
        {"evening": [], 
         "morning": [{"duration": 120, "name": "Meet3"}]}]))
    })
  })
  describe('failed', () => {
    it('should return an error', () => {
      let subject = [
        {
          name: "Meet1",
          duration: 450
        },
        {
          name: "Meet2",
          duration: 500
        }
      ]
      const trails = trailsFactory(subject)
      expect(() => {
        trails.build();
      }).toThrow("Sorry, something went wrong. Our monkeys are working to fix it :)");
    })
  })
  describe('when passing an empty array', () => {
    it('should return an empty array', () => {
      const trails = trailsFactory()
      const response = trails.build()
      expect(response).toEqual([])
    })
  })
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

  it('trail should start at 9am', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()
    
    expect(sanitized_trails[0]).toContain('9:00 Meet1 65min')
    expect(sanitized_trails[1]).toContain('9:00 Meet3 120min')
  })

  it('should start the first evening meet at 1pm', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()
    
    expect(sanitized_trails[0]).toContain('13:00 Meet2 240min')
    expect(sanitized_trails[1]).toContain('13:00 Evento de Networking')
  })

  it('the networking event should start at 5pm', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()
    
    expect(sanitized_trails[0]).toContain('17:00 Evento de Networking')
  })

  it('should return a trail without empty scape between meets', () => {
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
        name: "Meet4",
        duration: 30
      },
      {
        name: "Meet5",
        duration: 25
      }
    ]
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    expect(sanitized_trails[0]).toEqual(['9:00 Meet1 65min', '10:5 Meet4 30min', '10:35 Meet5 25min',
        '12:00 Almoço', '13:00 Meet2 240min', '17:00 Evento de Networking' ])
  })
})