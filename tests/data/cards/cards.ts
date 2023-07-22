/**
 * Seed data for the cards collection.
 *
 * @format
 */

const cards = [
  {
    _id: 'dba21fa7-ec07-47d0-9e14-66afe3157829',
    type: '365 credit',
    issuer: 'ocbc',
    benefits: [
      {
        category: 'dining',
        mccs: [5812, 5814, 5811],
        cashbackRate: 6,
      },
      {
        category: 'grocery',
        mccs: [5411],
        cashbackRate: 3,
      },
      {
        category: 'transport',
        mccs: [4111, 4011, 4112, 4121, 4131],
        cashbackRate: 3,
      },
      {
        category: 'petrol',
        mccs: [5541, 5542],
        cashbackRate: 6,
      },
      {
        category: 'travel',
        mccs: [4411, 4511],
        cashbackRate: 3,
      },
      {
        category: 'telecommunications',
        mccs: [],
        cashbackRate: 3,
      },
      {
        category: 'electricity',
        mccs: [],
        cashbackRate: 3,
      },
      {
        category: 'others',
        mccs: [],
        cashbackRate: 0.3,
      },
    ],
    exclusions: [
      4784, 4829, 5047, 5199, 5262, 6010, 6012, 6051, 6211, 6300, 5960, 6540,
      7349, 7523, 7995, 8062, 8211, 8220, 8241, 8244, 8249, 8299, 8398, 8661,
      8651, 8675, 8699, 9211, 9222, 9223, 9311,
    ],
    cashbackLimit: 80,
    minimumSpend: 800,
    createdAt: 1686934669733,
    updatedAt: 1686934669733,
    __v: 0,
  },
];

export default cards;
