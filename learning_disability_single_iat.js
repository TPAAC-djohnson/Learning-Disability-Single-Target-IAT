define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension) {
  /**
   * Single‑Target IAT configuration for the concept “Learning Disability”.
   *
   * This module defines a Single‑Target Implicit Association Test (ST‑IAT)
   * using MinnoJS’s IAT extension.  A single target concept (Learning Disability)
   * is paired with two attribute categories (Negative and Positive).
   * Practice and test blocks are automatically handled by the IAT library.
   *
   * At the end of the task a simple JSON download link appears allowing
   * participants to download their reaction‑time data.  This hook can be
   * removed or replaced if another data collection method is used.
   */

  var API = new APIConstructor();
  var global = API.getGlobal();

  // Define the target concept and its stimuli
  var TARGET_LABEL = 'Learning Disability';
  var TARGET_STIMULI = [
    { word:'Dyslexia' },
    { word:'Dyscalculia' },
    { word:'Dysgraphia' },
    { word:'ADHD' },
    { word:'Processing disorder' },
    { word:'Learning difference' }
  ];

  // Define the attribute words (positive and negative)
  var POSITIVE_WORDS = [
    'Capable',
    'Intelligent',
    'Strong',
    'Able',
    'Smart',
    'Creative',
    'Resilient',
    'Successful'
  ];

  var NEGATIVE_WORDS = [
    'Incapable',
    'Slow',
    'Weak',
    'Limited',
    'Difficult',
    'Frustrating',
    'Struggle',
    'Hard'
  ];

  // Styling – colours used for the target category and attributes
  var CATEGORY_COLOR = '#31940F'; // green for the target concept
  var ATTRIBUTE_COLOR = '#0000FF'; // blue for attributes

  // Build the IAT configuration using iatExtension
  var stiat = iatExtension({

    // Single target concept is implemented as category1
    category1 : {
      name : TARGET_LABEL,
      title : {
        media : { word: TARGET_LABEL },
        css : { color: CATEGORY_COLOR, 'font-size':'1.8em' },
        height : 4
      },
      stimulusMedia : TARGET_STIMULI,
      stimulusCss : { color: CATEGORY_COLOR, 'font-size':'2.3em' }
    },

    /**
     * category2 is intentionally left empty for a Single‑Target IAT.
     * An empty category ensures the IAT extension pairs the single
     * target concept with both attribute categories in separate blocks.
     */
    category2 : {
      name : 'Other',
      title : {
        media : { word: '' },
        css : { color: CATEGORY_COLOR, 'font-size':'1.8em' },
        height : 4
      },
      stimulusMedia : [],
      stimulusCss : { color: CATEGORY_COLOR, 'font-size':'2.3em' }
    },

    // Negative attribute
    attribute1 : {
      name : 'Negative',
      title : {
        media : { word:'Negative' },
        css : { color: ATTRIBUTE_COLOR, 'font-size':'1.8em' },
        height : 4
      },
      stimulusMedia : NEGATIVE_WORDS.map(function(word){
        return { word: word };
      }),
      stimulusCss : { color: ATTRIBUTE_COLOR, 'font-size':'2.3em' }
    },

    // Positive attribute
    attribute2 : {
      name : 'Positive',
      title : {
        media : { word:'Positive' },
        css : { color: ATTRIBUTE_COLOR, 'font-size':'1.8em' },
        height : 4
      },
      stimulusMedia : POSITIVE_WORDS.map(function(word){
        return { word: word };
      }),
      stimulusCss : { color: ATTRIBUTE_COLOR, 'font-size':'2.3em' }
    },

    /**
     * Provide a base_url for images if needed.
     * In this task images are not used, but MinnoJS requires this property.
     */
    base_url : {
      image : (global && global.baseURL) ? global.baseURL : ''
    },

    /**
     * Detect touch devices; required by MinnoJS for enabling touch‑friendly features.
     * When undefined, it defaults to false.
     */
    isTouch : global && global.$isTouch
  });

  /**
   * Add a hook to run at the end of the test.
   * This function collects the trial data and provides a JSON download link.
   * Researchers may replace or remove this hook depending on their
   * preferred data handling workflow.
   */
  API.addSettings('onEnd', function(){
    try {
      // Gather the full dataset from the API (reaction times, trial info, etc.)
      var data = API.getData();
      var jsonString = JSON.stringify(data, null, 2);
      // Create a downloadable blob
      var blob = new Blob([jsonString], { type: 'application/json' });
      var url = window.URL.createObjectURL(blob);
      // Construct a simple results page
      document.body.innerHTML = '';
      var container = document.createElement('div');
      container.style.textAlign = 'center';
      container.style.marginTop = '50px';
      var heading = document.createElement('h2');
      heading.textContent = 'Thank you for completing the task!';
      var paragraph = document.createElement('p');
      paragraph.textContent = 'Click below to download your results:';
      var link = document.createElement('a');
      link.href = url;
      link.download = 'stiat_data.json';
      link.textContent = 'Download ST‑IAT Data';
      link.style.display = 'inline-block';
      link.style.marginTop = '20px';
      link.style.fontSize = '1.2em';
      // Append elements to the container and body
      container.appendChild(heading);
      container.appendChild(paragraph);
      container.appendChild(link);
      document.body.appendChild(container);
    } catch (e) {
      // If data collection fails, log the error silently
      console.error('Data collection error:', e);
    }
  });

  // Return the configured task to MinnoJS
  return stiat;
});
