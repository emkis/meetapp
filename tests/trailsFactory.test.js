import trailsFactory from '../src/trailsFactory.js'

describe('#build', () => {
  describe('success', () => {
    it('should return a builded trail', () => {
      const subject = [
        { name: 'Meet1', duration: 65 },
        { name: 'Meet2', duration: 240 },
        { name: 'Meet3', duration: 120 },
        { name: 'Meet4', duration: 30 },
        { name: 'Meet5', duration: 25 }
      ]

      const trails = trailsFactory(subject)
      const response = trails.build()

      expect(response).toEqual(expect.arrayContaining([{'evening': [{'duration': 240, name: 'Meet2'}], 'morning': [{'duration': 65, name: 'Meet1'}, {'duration': 30, name: 'Meet4'}, {'duration': 25, name: 'Meet5'}]}, {'evening': [], 'morning': [{'duration': 120, name: 'Meet3'}]}]))
    })
  })

  describe('failed', () => {
    it('should return an error', () => {
      const subject = [
        { name: 'Meet1', duration: 450 },
        { name: 'Meet2', duration: 500 }
      ]

      const trails = trailsFactory(subject)

      expect(() => { trails.build() })
        .toThrow('Sorry, something went wrong. Our monkeys are working to fix it :)')
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
  const subject = [
    { name: 'Meet1', duration: 65 },
    { name: 'Meet2', duration: 240 },
    { name: 'Meet3', duration: 120 },
    { name: 'Meet4', duration: 30 },
    { name: 'Meet5', duration: 25 }
  ]

  it('should return a sanitized trail', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    expect(sanitized_trails).toEqual(expect.arrayContaining(
      [
        [
          { category: undefined, name: 'Meet1 65min', time: '9:00' },
          { category: undefined, name: 'Meet4 30min', time: '10:05' },
          { category: undefined, name: 'Meet5 25min', time: '10:35' },
          { name: 'Almoço', time: '12:00'},
          { category: undefined, name: 'Meet2 240min', time: '13:00' },
          { name: 'Evento de Networking', time: '17:00' }
        ],
        [
          { category: undefined, name: 'Meet3 120min', time: '9:00' },
          { name: 'Almoço', time: '12:00' },
          { name: 'Evento de Networking', time: '13:00' }
        ]
      ]))
  })

  it('should return a lunch time within the array', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    expect(sanitized_trails[0]).toContainEqual({ time: '12:00', name: 'Almoço' })
    expect(sanitized_trails[1]).toContainEqual({ time: '12:00', name: 'Almoço' })
  })

  it('trail should start at 9am', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    expect(sanitized_trails[0]).toContainEqual({ time: '9:00', name: 'Meet1 65min', category: undefined })
    expect(sanitized_trails[1]).toContainEqual({ time: '9:00', name: 'Meet3 120min', category: undefined })
  })

  it('should start the first evening meet at 1pm', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    const firstTrail = sanitized_trails[0]
    const secondTrail = sanitized_trails[1]

    expect(firstTrail).toContainEqual({ time: '13:00', name: 'Meet2 240min', category: undefined })
    expect(secondTrail).toContainEqual({ time: '13:00', name: 'Evento de Networking' })
  })

  it('the networking event should start at 5pm', () => {
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    expect(sanitized_trails[0]).toContainEqual({ time: '17:00', name: 'Evento de Networking' })
  })

  it('should return a trail without empty scape between meets', () => {
    let subject = [
      { name: 'Meet1', duration: 65 },
      { name: 'Meet2', duration: 240 },
      { name: 'Meet4', duration: 30 },
      { name: 'Meet5', duration: 25 }
    ]
    const factory = trailsFactory(subject)
    factory.build()
    const sanitized_trails = factory.buildSchedule()

    expect(sanitized_trails[0]).toEqual(
      [
        { time: '9:00', name: 'Meet1 65min', category: undefined },
        { time: '10:05', name: 'Meet4 30min', category: undefined },
        { time: '10:35', name: 'Meet5 25min', category: undefined },
        { time: '12:00', name: 'Almoço' },
        { time: '13:00', name: 'Meet2 240min', category: undefined },
        { time: '17:00', name: 'Evento de Networking' }
      ])
  })
})
