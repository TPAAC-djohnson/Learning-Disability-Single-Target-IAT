define(
  ['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'],
  function(APIConstructor, iatExtension){

    let API = new APIConstructor();
    let global = API.getGlobal();

    // ================================
    // Labels
    // ================================
    const LD_LABEL = 'Learning disabilities';
    const NO_LD_LABEL = 'No learning disabilities';

    // ================================
    // Category stimuli (words)
    // ================================
    const LD_STIMULI = [
      {word:'Dyslexia'},
      {word:'Dyscalculia'},
      {word:'Dysgraphia'},
      {word:'ADHD'},
      {word:'Processing disorder'},
      {word:'Learning difference'}
    ];

    const NO_LD_STIMULI = [
      {word:'Typical learning'},
      {word:'Neurotypical'},
      {word:'Standard classroom'},
      {word:'Traditional instruction'},
      {word:'No diagnosis'},
      {word:'Typical development'}
    ];

    // ================================
    // Attribute stimuli
    // ================================
    const NEG_WORDS = [
      'Difficult',
      'Frustrating',
      'Struggle',
      'Slow',
      'Confusing',
      'Stress',
      'Hard',
      'Problem'
    ];

    const POS_WORDS = [
      'Capable',
      'Smart',
      'Creative',
      'Resilient',
      'Able',
      'Strong',
      'Successful',
      'Confident'
    ];

    // ================================
    // Styling
    // ================================
    const CATEGORY_COLOR = '#31940F';
    const ATTRIBUTE_COLOR = '#0000FF';

    return iatExtension({

      category1 : {
        name : LD_LABEL,
        title : {
          media : {word: LD_LABEL},
          css : {color: CATEGORY_COLOR, 'font-size':'1.8em'},
          height : 4
        },
        stimulusMedia : LD_STIMULI,
        stimulusCss : {color: CATEGORY_COLOR, 'font-size':'2.3em'}
      },

      category2 : {
        name : NO_LD_LABEL,
        title : {
          media : {word: NO_LD_LABEL},
          css : {color: CATEGORY_COLOR, 'font-size':'1.8em'},
          height : 4
        },
        stimulusMedia : NO_LD_STIMULI,
        stimulusCss : {color: CATEGORY_COLOR, 'font-size':'2.3em'}
      },

      attribute1 : {
        name : 'Negative',
        title : {
          media : {word:'Negative'},
          css : {color: ATTRIBUTE_COLOR, 'font-size':'1.8em'},
          height : 4
        },
        stimulusMedia : NEG_WORDS.map(w => ({word:w})),
        stimulusCss : {color: ATTRIBUTE_COLOR, 'font-size':'2.3em'}
      },

      attribute2 : {
        name : 'Positive',
        title : {
          media : {word:'Positive'},
          css : {color: ATTRIBUTE_COLOR, 'font-size':'1.8em'},
          height : 4
        },
        stimulusMedia : POS_WORDS.map(w => ({word:w})),
        stimulusCss : {color: ATTRIBUTE_COLOR, 'font-size':'2.3em'}
      },

      base_url : {
        image : (global && global.baseURL)
          ? global.baseURL
          : 'https://your-hosted-image-directory/'
      },

      isTouch : global && global.$isTouch
    });
  }
);
