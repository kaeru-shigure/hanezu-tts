declare module "*.js" {
  export const find_kaomoji_parts: any;
  export const exclude_kaomoji_from_numeral_processing: any;
  export const silence_kaomoji: any;
  export const normalize_roman_numerals: any;
  export const fill_missing_feature_flags: any;
  export const fill_missing_morph_flags: any;
  export const split_kana_mora: (value: string) => string[];
  export const dict: (value?: unknown) => any;
  export const list: (value?: unknown) => any;
  export const __kwargtrans__: (value: unknown) => any;
  export const normalize_unknown_itaiji: any;
  export const suppress_unnatural_auxiliary_u_long_vowel: any;
  export const modify_old_province_yomi: any;
  export const split_prefix_accent_phrase: any;
  export const retreat_acc_nuc: any;
  export const modify_acc_after_chaining: any;
  export const process_odori_features: any;
  export const modify_context_reading: any;
  export const restore_loanword_kana: any;
  export const make_phoneme_mapping: any;
  export const _restore_unknown_katakana_features: any;
  export const _apply_original_rule_before_chaining: any;
  export const _expand_symbol_feature: any;
  export const _mark_numeral_space_boundaries: any;
  export const KNOWN_SYMBOL_FEATURES: Record<
    string,
    [number, number, number, string]
  >;
  export const select_mecab_features_with_tsqyomi: any;
  export const set_model: any;
}
